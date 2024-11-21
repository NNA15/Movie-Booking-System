package com.example.test.dto;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ShowDetailsResponse {
  private String location;
  private LocalDateTime timeStart;
  private Integer movieDuration;
  private String movieName;
  private Integer roomNumber;

}
