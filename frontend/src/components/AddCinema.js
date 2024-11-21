import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCinema() {
  const [cinemaName, setCinemaName] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/cinema",
        {
          name: cinemaName,
          location: location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setCinemaName("");
      setLocation("");
      alert("Cinema added successfully!");
      navigate("/admin");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Cinema already exists!");
      } else {
        console.error("Error adding cinema:", error);
        alert("Failed to add cinema. Please try again.");
      }
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>Add Cinema</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label>Cinema Name:</label>
          <input
            type="text"
            value={cinemaName}
            onChange={(e) => setCinemaName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={inputStyle}
          />
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

export default AddCinema;
