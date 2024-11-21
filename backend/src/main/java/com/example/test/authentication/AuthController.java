package com.example.test.authentication;

import com.example.test.dto.ResetPasswordRequest;
import com.example.test.entities.User;
import com.example.test.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserService userService;

  @Autowired
  private JWTService jwtService;

  @PostMapping("/signup")
  public ResponseEntity<User> createUser(@RequestBody User user) {
    User user1 = userService.createUser(user);
    return ResponseEntity.ok(user1);
  }

  @PostMapping("/login")
  public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

    if (authentication.isAuthenticated()) {
      return jwtService.generateToken(authRequest.getUsername());
    }

    throw new UsernameNotFoundException("invalid user details.");
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<String> forgotPassword(@RequestParam("email") String email) {
    userService.sendPasswordResetEmail(email);
    return ResponseEntity.ok("Email has been send");
  }

  @PostMapping("/reset-password")
  public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
    try {
      userService.resetPassword(request.getToken(), request.getNewPassword());
      return ResponseEntity.ok("Password has been changed.");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error: " + e.getMessage());
    }
  }
}
