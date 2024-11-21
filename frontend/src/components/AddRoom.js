import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddRoom() {
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/cinema",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCinemas(response.data);
      } catch (error) {
        console.error("Error fetching cinemas:", error);
      }
    };

    fetchCinemas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `http://localhost:8000/room/create/${selectedCinema}`,
        {
          roomNumber: roomNumber,
          capacity: capacity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Room added:", response.data);


      alert("Room added successfully!");

      setRoomNumber(""); 
      setCapacity(""); 
      setSelectedCinema(""); 


      navigate("/admin");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Room already exists!");
      } else {
        console.error("Error adding room:", error);
        alert("Failed to add room. Please try again.");
      }
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>Add Room</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label>Room Number:</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Capacity:</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Select Cinema:</label>
          <select
            value={selectedCinema}
            onChange={(e) => setSelectedCinema(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="">Select a Cinema</option>
            {cinemas.map((cinema) => (
              <option key={cinema.id} value={cinema.id}>
                {cinema.name} - {cinema.location} {/* Hiển thị name-location */}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={submitButtonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
}

// CSS styles
const formContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "50px",
};

const titleStyle = {
  marginBottom: "20px",
  fontSize: "24px",
  color: "#333",
};

const formStyle = {
  width: "100%",
  maxWidth: "500px",
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
};

const inputGroupStyle = {
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const submitButtonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
};

export default AddRoom;
