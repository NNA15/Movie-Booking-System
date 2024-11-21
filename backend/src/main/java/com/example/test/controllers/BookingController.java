package com.example.test.controllers;

import com.example.test.authentication.UserDetailsImpl;
import com.example.test.dto.BookingRequest;
import com.example.test.dto.BookingResponse;
import com.example.test.services.BookingService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/booking")
@CrossOrigin
public class BookingController {

  @Autowired
  private BookingService bookingService;

  @PostMapping
  public ResponseEntity<Object> createBooking(@RequestBody BookingRequest bookingRequest, @AuthenticationPrincipal
      UserDetailsImpl userDetails) throws Exception {
    return new ResponseEntity<>(bookingService.createBooking(bookingRequest, userDetails), HttpStatus.CREATED);
  }

  @GetMapping("/user")
  public ResponseEntity<List> getBookingByUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
    return new ResponseEntity<>(bookingService.getBookingByUser(userDetails), HttpStatus.OK);
  }

  @GetMapping("{bookingId}")
  public ResponseEntity<BookingResponse> getBookingDetail(@PathVariable Integer bookingId) {
    try {
      return new ResponseEntity<>(bookingService.getBookingDetail(bookingId), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

}
