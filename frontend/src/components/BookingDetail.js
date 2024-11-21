import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookingDetail = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bookingId } = useParams();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/api/booking/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(response.data);
        setLoading(false);
      } catch (error) {
        setError("Can not load booking.");
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Booking Details</h1>
      {booking && (
        <div style={styles.detailsContainer}>
          <div style={styles.detailItem}>
            <strong>Name:</strong> <span>{booking.name}</span>
          </div>
          <div style={styles.detailItem}>
            <strong>Phone:</strong> <span>{booking.phone}</span>
          </div>
          <div style={styles.detailItem}>
            <strong>Total:</strong> <span>{booking.total} VND</span>
          </div>
          <div style={styles.detailItem}>
            <strong>Booking Date:</strong> <span>{new Date(booking.bookingDate).toLocaleString()}</span>
          </div>
          <div style={styles.detailItem}>
            <strong>Location:</strong> <span>{booking.location}</span>
          </div>
          <div style={styles.detailItem}>
            <strong>Room Number:</strong> <span>{booking.roomNumber}</span>
          </div>
          <div style={styles.detailItem}>
            <strong>Seat Number:</strong> <span>{booking.seatNumber.join(", ")}</span>
          </div>
          <div style={styles.detailItem}>
            <strong>Movie Name:</strong> <span>{booking.movieName}</span>
          </div>
          <div style={styles.detailItem}>
            <strong>Duration:</strong> <span>{booking.duration} minutes</span>
          </div>
          <div style={styles.detailItem}>
            <strong>Time Start:</strong> <span>{new Date(booking.timeStart).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
    margin: "0 auto",
  },
  detailItem: {
    marginBottom: "15px",
    fontSize: "18px",
  },
  detailItemLabel: {
    fontWeight: "bold",
  },
};

export default BookingDetail;
