package com.example.test.services;

import com.example.test.entities.PasswordResetToken;
import com.example.test.entities.User;
import com.example.test.repositories.PasswordTokenRepository;
import com.example.test.repositories.UserRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JavaMailSender mailSender;

  @Autowired
  private PasswordTokenRepository tokenRepository;

  private static final int time_Expiration = 10;

  public User createUser(User user) {
    User user1 = User.builder().email(user.getEmail())
        .password(passwordEncoder.encode(user.getPassword())).address(user.getAddress())
        .role("USER").name(user.getName()).mobile(user.getMobile()).build();
    return userRepository.save(user1);
  }

  public void sendPasswordResetEmail(String email) {
    Optional<User> userOptional = userRepository.findByEmail(email);
    if (userOptional.isEmpty()) {
      throw new RuntimeException("Email does not exit");
    }
    User user = userOptional.get();

    String token = UUID.randomUUID().toString();
    PasswordResetToken resetToken = new PasswordResetToken();
    resetToken.setToken(token);
    resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(time_Expiration));
    resetToken.setUser(user);
    tokenRepository.save(resetToken);


    String resetLink = "http://localhost:3000/reset-password?token=" + token;
    sendEmail(user.getEmail(), "Reset Password", "Please enter this link to reset password: " + resetLink);
  }

  private void sendEmail(String to, String subject, String body) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom("your-email@example.com");
    message.setTo(to);
    message.setSubject(subject);
    message.setText(body);
    mailSender.send(message);
  }

  public void resetPassword(String token, String newPassword) {

    PasswordResetToken resetToken = tokenRepository.findByToken(token);
    if (resetToken == null) {
      throw new RuntimeException("Invalid Token");
    }


    if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
      throw new RuntimeException("Expired Token");
    }


    User user = resetToken.getUser();


    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);
  }
}
