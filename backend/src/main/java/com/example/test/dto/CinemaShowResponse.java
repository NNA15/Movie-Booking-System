package com.example.test.dto;

import com.example.test.entities.Show;
import java.util.List;
import lombok.Data;

@Data
public class CinemaShowResponse {

  private String cinemaName;
  private String cinemaLocation;
  private List<Show> shows;
}
