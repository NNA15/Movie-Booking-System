package com.example.test.repositories;

import com.example.test.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

  Movie findByName(String name);
}
