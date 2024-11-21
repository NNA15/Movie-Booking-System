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

@Entity
@Table(name = "MOVIE_SHOW")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Show {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private LocalDateTime timeStart;

  private LocalDateTime timeEnd;

  @JsonBackReference("movie-show")
  @ManyToOne
  @JoinColumn(name = "movie_id", nullable = false)
  private Movie movie;

  @JsonBackReference("room-show")
  @ManyToOne
  @JoinColumn(name = "room_id", nullable = false)
  private Room room;

  @JsonManagedReference("show-seat")
  @OneToMany(mappedBy = "show", cascade = CascadeType.ALL)
  private List<Seat> seats = new ArrayList<>();

//  @OneToMany(mappedBy = "show", cascade = CascadeType.ALL)
//  private List<Booking> bookings = new ArrayList<>();
}
