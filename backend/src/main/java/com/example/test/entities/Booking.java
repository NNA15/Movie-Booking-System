package com.example.test.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "BOOKING")
@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String name;

  private String phone;

  private Integer total;

  private String BookingCode;

  private LocalDateTime bookingDate;

  private String paymentMethod;

  private boolean paid; // 1: paid 0: not pay

  private boolean changed; // 1 : changed 0: not change

  @JsonBackReference("user-booking")
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @JsonManagedReference("booking-seat")
  @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
  private List<Seat> seatList = new ArrayList<>();

}