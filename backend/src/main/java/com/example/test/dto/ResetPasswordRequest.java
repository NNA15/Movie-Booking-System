package com.example.test.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {
  private String token;
  private String newPassword;
}