package com.example.test.repositories;

import com.example.test.entities.PasswordResetToken;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordTokenRepository extends JpaRepository<PasswordResetToken, Integer> {

  PasswordResetToken findByToken(String token);

}
