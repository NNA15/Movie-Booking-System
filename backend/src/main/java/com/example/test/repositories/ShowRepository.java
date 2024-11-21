package com.example.test.repositories;

import com.example.test.entities.Show;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ShowRepository extends JpaRepository<Show, Integer> {

  List<Show> findByMovieId(Integer movieId);

  @Query(value = "SELECT * from movie_show where room_id = :roomId and (time_start >= :timeStart and time_start <= :timeEnd) or (time_start <= :timeStart and time_end >= :timeStart)", nativeQuery = true)
  List<Show> findConflictShow(@Param("roomId") Integer roomId, @Param("timeStart") LocalDateTime timeStart, @Param("timeEnd") LocalDateTime timeEnd);
}
