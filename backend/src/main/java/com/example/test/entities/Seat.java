package com.example.test.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "SEAT")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Seat {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private Integer seatNumber;

  private Integer price;

  private Boolean available;

  @JsonBackReference("booking-seat")
  @ManyToOne
  @JoinColumn(name = "booking_id", nullable = true)
  private Booking booking;

  @JsonBackReference("show-seat")
  @ManyToOne
  @JoinColumn(name = "show_id", nullable = false)
  private Show show;

}
