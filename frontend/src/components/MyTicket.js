import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const MyTicket = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/booking/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError("Can not load booking.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleBookingClick = (bookingId) => {
    navigate(`/booking/${bookingId}`);
  };

  const handleChangeClick = (bookingId) => {
    navigate(`/change-booking/${bookingId}`); 
  };

  const formatBookingDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}-${month}-${year}`;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Tickets</h1>

      {bookings.length === 0 ? (
        <p style={styles.noBookings}>No Booking.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Booking Code</th>
              <th style={styles.th}>Booking Date</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Payment Method</th>
              <th style={styles.th}>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                style={styles.tableRow}
                onClick={() => handleBookingClick(booking.id)} 
              >
                <td style={styles.td}>{booking.bookingCode}</td>
                <td style={styles.td}>{formatBookingDate(booking.bookingDate)}</td> 
                <td style={styles.td}>{booking.total} VND</td>
                <td style={styles.td}>{booking.paymentMethod}</td>
                <td style={styles.td}>
                  <button
                    style={styles.changeButton}
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleChangeClick(booking.id);
                    }}
                  >
                    Change
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  noBookings: {
    color: "#666",
    fontSize: "18px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "12px",
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
  },
  td: {
    borderBottom: "1px solid #ddd",
    padding: "12px",
    cursor: "pointer",
  },
  tableRow: {
    transition: "background-color 0.3s ease",
  },
  tableRowHover: {
    backgroundColor: "#f1f1f1",
  },
  changeButton: {
    backgroundColor: "#4CAF50", 
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
    display: "inline-block",
    textAlign: "center",
  },
};

export default MyTicket;
