package com.example.test.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ShowRequest {
  private LocalDateTime timeStart;
  private LocalDateTime timeEnd;
  private Integer roomId;
  private Integer movieId;
}
