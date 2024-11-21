package com.example.test.controllers;

import com.example.test.entities.Cinema;
import com.example.test.services.CinemaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/cinema")
@CrossOrigin
public class CinemaController {
  @Autowired
  private CinemaService cinemaService;

  @PostMapping
  public ResponseEntity<String> createCinema(@RequestBody Cinema cinema) {
    try {
      String result = cinemaService.createCinema(cinema);
      return new ResponseEntity<>(result, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping
  public List getAllCinema() {
    return cinemaService.getAllCinema();
  }

}
