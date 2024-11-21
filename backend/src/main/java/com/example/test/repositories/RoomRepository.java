package com.example.test.repositories;

import com.example.test.entities.Room;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Integer> {

  Optional<Room> findByRoomNumberAndCinemaId(Integer roomNumber, Integer cinemaId);

  List<Room> getRoomByCinemaId(Integer cinemaId);

}