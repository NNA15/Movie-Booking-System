import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddMovie() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState(null);
  const navigate = useNavigate();

  const handlePosterChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");


    const formData = new FormData();
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("rating", rating);
    formData.append("genre", genre);
    formData.append("language", language);
    formData.append("description", description);
    formData.append("file", poster);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/movie",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );


      setName("");
      setDuration("");
      setRating("");
      setGenre("");
      setLanguage("");
      setDescription("");
      setPoster(null);

      alert("Movie added successfully!");
      navigate("/admin");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Movie already exists!");
      } else {
        console.error("Error adding movie:", error);
        alert("Failed to add movie. Please try again.");
      }
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>Add Movie</h2>
      <form
        onSubmit={handleSubmit}
        style={formStyle}
        encType="multipart/form-data"
      >
        <div style={inputGroupStyle}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Duration (minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Rating:</label>
          <input
            type="number"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Language:</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Poster:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePosterChange}
            required
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

export default AddMovie;
