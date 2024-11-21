package com.example.test.services;

import com.example.test.entities.Cinema;
import com.example.test.repositories.CinemaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CinemaService {

  @Autowired
  private CinemaRepository cinemaRepository;

  public String createCinema(Cinema cinema) throws Exception {
    if (cinemaRepository.findByLocation(cinema.getLocation()) != null) {
      throw new Exception("Cinema is present on this location");
    }

    cinemaRepository.save(cinema);
    return "Cinema has been created successfully";
  }

  public List<Cinema> getAllCinema() {
    return cinemaRepository.findAll();
  }

}
