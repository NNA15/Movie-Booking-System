package com.example.test.controllers;

import com.example.test.entities.Seat;
import com.example.test.dto.SeatRequest;
import com.example.test.services.SeatService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/seat")
@CrossOrigin
public class SeatController {

  @Autowired
  private SeatService seatService;

  @PostMapping
  public ResponseEntity<String> createSeatOfShow(@RequestBody SeatRequest seatRequest) throws Exception {
    try {
      String result = seatService.createSeatOfShow(seatRequest);
      return new ResponseEntity<>(result, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping("{showId}")
  public ResponseEntity<List<Seat>> getSeatByShow(@PathVariable Integer showId) throws Exception {
    try {
      List<Seat> seats = seatService.getSeatsByShow(showId);
      return new ResponseEntity<>(seats, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }
}
