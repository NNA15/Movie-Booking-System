package com.example.test.controllers;

import com.example.test.dto.ShowDetailsResponse;
import com.example.test.entities.Show;
import com.example.test.dto.CinemaShowResponse;
import com.example.test.dto.ShowRequest;
import com.example.test.services.ShowService;
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
@RequestMapping("/api/show")
@CrossOrigin
public class ShowController {

  @Autowired
  private ShowService showService;

  @GetMapping("conflict")
  public List<Show> getConflictShow(@RequestBody ShowRequest showRequest) {
    return showService.findConflictShows(showRequest);
  }

  @PostMapping
  public ResponseEntity<Show> createShow(@RequestBody ShowRequest showRequest) throws Exception {
    try {
      Show show = showService.createShow(showRequest);
      return new ResponseEntity<>(show, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping("movie/{movieId}")
  public ResponseEntity<List<CinemaShowResponse>> getShowsByMovieAndGroupByCinema(@PathVariable Integer movieId) {
    List<CinemaShowResponse> shows = showService.findShowsByMovieAndGroupByCinema(movieId);
    return ResponseEntity.ok(shows);
  }

  @GetMapping("{showId}")
  public ResponseEntity<ShowDetailsResponse> getShowDetails(@PathVariable Integer showId) throws Exception {
    try {
      return new ResponseEntity<>(showService.getShowDetails(showId), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }
}
