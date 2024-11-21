package com.example.test.dto;

import java.util.List;
import lombok.Data;

@Data
public class BookingRequest {
  private Integer total;
  private List<Integer> seatId;
  private String name;
  private String phone;

}
