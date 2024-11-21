package com.example.test.services;

import com.example.test.entities.Seat;
import com.example.test.entities.Show;
import com.example.test.repositories.SeatRepository;
import com.example.test.repositories.ShowRepository;
import com.example.test.dto.SeatRequest;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeatService {

  @Autowired
  private SeatRepository seatRepository;

  @Autowired
  private ShowRepository showRepository;

  public String createSeatOfShow(SeatRequest seatRequest) throws Exception {
    Optional<Show> showOptional = showRepository.findById(seatRequest.getShowId());
    if(showOptional.isEmpty()) {
      throw new Exception("Show does not exit");
    }

    Show show = showOptional.get();
    for(int i = 1; i <= show.getRoom().getCapacity(); i++) {
      Seat seat = Seat.builder().seatNumber(i).price(seatRequest.getPrice()).show(show).available(true).build();
      seatRepository.save(seat);
    }
    return "Seats are already created";
  }

  public List<Seat> getSeatsByShow(Integer showId) throws Exception {
    Optional<Show> showOptional = showRepository.findById(showId);
    if(showOptional.isEmpty()) {
      throw new Exception("Show does not exit");
    }
    Show show = showOptional.get();
    return show.getSeats();
  }

}
