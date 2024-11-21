package com.example.test.repositories;

import com.example.test.entities.Booking;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

  @Query("select b from Booking b where b.BookingCode = :bookingCode")
  Booking findByBookingCode(String bookingCode);

  @Query("select b from Booking b where b.user.id = :userId and b.paid = true")
  List<Booking> getAllByUser(Integer userId);

}

