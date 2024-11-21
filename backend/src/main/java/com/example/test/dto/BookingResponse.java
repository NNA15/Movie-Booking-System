package com.example.test.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BookingResponse {
  private String name;
  private String phone;
  private Integer total;
  private LocalDateTime bookingDate;
  private List<Integer> seatNumber;
  private Integer roomNumber;
  private String location;
  private String movieName;
  private Integer duration;
  private LocalDateTime timeStart;

}
