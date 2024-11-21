package com.example.test.controllers;

import com.example.test.entities.Room;
import com.example.test.services.RoomService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/room")
@CrossOrigin
public class RoomController {

  @Autowired
  private RoomService roomService;

  @PostMapping("{cinemaId}")
  public ResponseEntity<String> createRoom(@PathVariable Integer cinemaId ,@RequestBody Room room) {
    try{
      String result = roomService.createRoom(cinemaId, room);
      return new ResponseEntity<>(result, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping("/{cinemaId}")
  public ResponseEntity<List<Room>> getAllRoomByCinema(@PathVariable Integer cinemaId) {
    try {
      List<Room> rooms = roomService.getALlRoomsByCinema(cinemaId);

      if(rooms.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      else {
        return new ResponseEntity<>(rooms, HttpStatus.OK);
      }
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
