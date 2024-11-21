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
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "ROOM")
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Room {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private Integer roomNumber;

  private Integer capacity;

//  @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
//  private List<Seat> seats = new ArrayList<>();

  @JsonManagedReference("room-show")
  @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
  private List<Show> shows = new ArrayList<>();

  @JsonBackReference("cinema-room")
  @ManyToOne
  @JoinColumn(name = "cinema_id", nullable = false)
  private Cinema cinema;
}
