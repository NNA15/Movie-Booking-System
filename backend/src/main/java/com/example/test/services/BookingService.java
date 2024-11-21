package com.example.test.services;

import com.example.test.authentication.UserDetailsImpl;
import com.example.test.dto.BookingResponse;
import com.example.test.entities.Booking;
import com.example.test.entities.Seat;
import com.example.test.entities.Show;
import com.example.test.entities.User;
import com.example.test.payment_vnpay.VNPayUtil;
import com.example.test.repositories.BookingRepository;
import com.example.test.repositories.SeatRepository;
import com.example.test.repositories.UserRepository;
import com.example.test.dto.BookingRequest;
import io.jsonwebtoken.security.Jwks.OP;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookingService {

  @Autowired
  private BookingRepository bookingRepository;

  @Autowired
  private SeatRepository seatRepository;

  @Autowired
  private UserRepository userRepository;

  @Transactional(isolation = Isolation.SERIALIZABLE)
  public Booking createBooking(BookingRequest bookingRequest, UserDetailsImpl userDetails)
      throws Exception {
    String bookingCode = VNPayUtil.getRandomNumber(8);
    List<Seat> seats = new ArrayList<>();
    for (int seatId : bookingRequest.getSeatId()) {
      Seat seat = seatRepository.findAndLockSeat(seatId);
      if (seat.getAvailable() == false) {
        throw new RuntimeException("Seat with number: " + seat.getSeatNumber() + " not available");
      }
      seat.setAvailable(false);
      seats.add(seat);
    }
//    if(seats.size() != bookingRequest.getSeatId().size()) {
//      throw new Exception("Seat not available");
//    }
    Optional<User> userOptional = userRepository.findByEmail(userDetails.getUsername());
//    Thread.sleep(5000);

    User user = userOptional.get();
    System.out.println("Seat List: " + seats);
    Booking booking = Booking.builder().total(bookingRequest.getTotal())
        .name(bookingRequest.getName()).phone(bookingRequest.getPhone()).user(user).seatList(seats)
        .bookingDate(
            LocalDateTime.now()).changed(false)
        .paymentMethod("vn-pay").paid(false).BookingCode(bookingCode).build();
    Booking savedBooking = bookingRepository.save(booking);
    for (Seat seat : seats) {
      seat.setBooking(savedBooking);
      seatRepository.save(seat);
    }

    return savedBooking;
  }

  public List<Booking> getBookingByUser(UserDetailsImpl userDetails) {
    Optional<User> userOptional = userRepository.findByEmail(userDetails.getUsername());
    User user = userOptional.get();
    return bookingRepository.getAllByUser(user.getId());
  }

  public BookingResponse getBookingDetail(Integer bookingId) {
    Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
    Booking booking = bookingOptional.get();

    List<Integer> seatNumber = new ArrayList<>();

    for (Seat seat : booking.getSeatList()) {
      seatNumber.add(seat.getId());
    }

    Show show = booking.getSeatList().get(0).getShow();
    String location =
        show.getRoom().getCinema().getName() + "-" + show.getRoom().getCinema().getLocation();

    BookingResponse response = BookingResponse.builder().name(booking.getName())
        .total(booking.getTotal()).bookingDate(booking.getBookingDate()).seatNumber(seatNumber)
        .roomNumber(show.getRoom().getRoomNumber()).location(location)
        .movieName(show.getMovie().getName()).duration(show.getMovie().getDuration()).phone(booking.getPhone()).timeStart(show.getTimeStart()).build();
    return response;
  }

}
