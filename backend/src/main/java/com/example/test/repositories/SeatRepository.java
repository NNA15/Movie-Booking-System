package com.example.test.repositories;

import com.example.test.entities.Seat;
import jakarta.persistence.LockModeType;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SeatRepository extends JpaRepository<Seat, Integer> {

//  @Lock(LockModeType.PESSIMISTIC_WRITE) // if use lock find Seat with id and available
  @Query("SELECT s FROM Seat s WHERE s.id = :seatId")
  Seat findAndLockSeat(@Param("seatId") Integer seatId);

}
