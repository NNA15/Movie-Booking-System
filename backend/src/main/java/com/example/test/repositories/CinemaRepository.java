package com.example.test.repositories;

import com.example.test.entities.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaRepository extends JpaRepository<Cinema, Integer> {
  Cinema findByLocation(String location);
}
