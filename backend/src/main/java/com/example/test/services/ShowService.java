package com.example.test.services;

import com.example.test.dto.ShowDetailsResponse;
import com.example.test.entities.Cinema;
import com.example.test.entities.Movie;
import com.example.test.entities.Room;
import com.example.test.entities.Show;
import com.example.test.repositories.MovieRepository;
import com.example.test.repositories.RoomRepository;
import com.example.test.repositories.ShowRepository;
import com.example.test.dto.CinemaShowResponse;
import com.example.test.dto.ShowRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShowService {

  @Autowired
  private ShowRepository showRepository;

  @Autowired
  private MovieRepository movieRepository;

  @Autowired
  private RoomRepository roomRepository;

  public List<Show> findConflictShows(ShowRequest showRequest) {
    return showRepository.findConflictShow(showRequest.getRoomId(), showRequest.getTimeStart(), showRequest.getTimeEnd());
  }

  public Show createShow(ShowRequest showRequest) throws Exception {
    List<Show> conflictShows = findConflictShows(showRequest);
    if(conflictShows.isEmpty()) {
      Optional<Movie> movieOptional = movieRepository.findById(showRequest.getMovieId());
      if (movieOptional.isEmpty()) {
        throw new Exception("Movie does not exit");
      }

      Optional<Room> roomOptional = roomRepository.findById(showRequest.getRoomId());
      if (roomOptional.isEmpty()) {
        throw new Exception("Room does not exit");
      }


      Movie movie = movieOptional.get();
      Room room = roomOptional.get();

      Show show = Show.builder().timeStart(showRequest.getTimeStart()).timeEnd(showRequest.getTimeEnd()).movie(movie)
          .room(room).build();
      showRepository.save(show);

      return show;
    }
    else {
      throw new Exception("Conflict Show already exit");
    }
  }

  public List<CinemaShowResponse> findShowsByMovieAndGroupByCinema(Integer movieId) {
    List<Show> shows = showRepository.findByMovieId(movieId);

    Map<Integer, CinemaShowResponse> map = new HashMap<>();
    for (Show show : shows) {
      Integer cinemaId = show.getRoom().getCinema().getId();
      String cinemaName = show.getRoom().getCinema().getName();
      String cinemaLocation = show.getRoom().getCinema().getLocation();

      CinemaShowResponse temp = map.get(cinemaId);
      if(temp == null) {
        temp = new CinemaShowResponse();
        temp.setCinemaLocation(cinemaLocation);
        temp.setCinemaName(cinemaName);
        temp.setShows(new ArrayList<>());
        map.put(cinemaId, temp);
      }
      temp.getShows().add(show);
    }
    return new ArrayList<>(map.values());
  }

  public ShowDetailsResponse getShowDetails(Integer showId) throws Exception {
    Optional<Show> showOptional = showRepository.findById(showId);
    if(showOptional.isEmpty()) {
      throw new Exception("Show not available");
    }
    Show show = showOptional.get();
    ShowDetailsResponse showDetailsResponse = new ShowDetailsResponse();
    Cinema cinema = show.getRoom().getCinema();
    showDetailsResponse.setLocation(cinema.getName() + "-" + cinema.getLocation());
    Movie movie = show.getMovie();
    showDetailsResponse.setMovieName(movie.getName());
    showDetailsResponse.setMovieDuration(movie.getDuration());
    showDetailsResponse.setTimeStart(show.getTimeStart());
    showDetailsResponse.setRoomNumber(show.getRoom().getRoomNumber());

    return showDetailsResponse;

  }
}
