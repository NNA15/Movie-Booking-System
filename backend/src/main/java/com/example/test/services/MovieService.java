package com.example.test.services;

import com.example.test.entities.Movie;
import com.example.test.repositories.MovieRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

  @Autowired
  private MovieRepository movieRepository;

  public String createMovie(Movie movie) throws Exception {
    if (movieRepository.findByName(movie.getName()) != null) {
      throw new Exception("Movie " + movie.getName() + " is present");
    }
    movieRepository.save(movie);
    return "Movie has been created successfully";
  }

  public List<Movie> getAllMovie() {
    return movieRepository.findAll();
  }

  public Movie updateMovie(Movie movie) throws Exception {
    if(movieRepository.findById(movie.getId()) == null) {
      throw new IllegalAccessException("Movie does not exit");
    }
    return movieRepository.save(movie);
  }
}
