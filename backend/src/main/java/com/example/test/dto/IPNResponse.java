package com.example.test.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class IPNResponse {

  @JsonProperty("RspCode")
  private String responseCode;
  @JsonProperty("Message")
  private String message;

}
