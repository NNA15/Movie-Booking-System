package com.example.test.services;

import com.example.test.entities.Cinema;
import com.example.test.entities.Room;
import com.example.test.repositories.CinemaRepository;
import com.example.test.repositories.RoomRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

  @Autowired
  private RoomRepository roomRepository;

  @Autowired
  private CinemaRepository cinemaRepository;

  public String createRoom(Integer cinemaId, Room room) throws Exception {

    Optional<Cinema> cinemaOptional = cinemaRepository.findById(cinemaId);

    if (cinemaOptional.isEmpty()) {
      throw new Exception("Cinema does not exit");
    }

    Cinema cinema = cinemaOptional.get();
    room.setCinema(cinema);
    if (roomRepository.findByRoomNumberAndCinemaId(room.getRoomNumber(), cinemaId).isPresent()) {

      throw new Exception("This room is already present");
    }
    roomRepository.save(room);
    return "This room has been created successfully";
  }


  public List<Room> getALlRoomsByCinema(Integer cinemaId) throws Exception {
    Cinema cinema = cinemaRepository.findById(cinemaId)
        .orElseThrow(() -> new Exception("This cinema does not exit"));

    return roomRepository.getRoomByCinemaId(cinemaId);

  }
}
