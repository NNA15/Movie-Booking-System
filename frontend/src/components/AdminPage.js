import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/movie", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <div style={navbarStyle}>
        <Link to="cinema/create" style={buttonStyle}>Add Cinema</Link>
        <Link to="room/create" style={buttonStyle}>Add Room</Link>
        <Link to="movie/create" style={buttonStyle}>Add Movie</Link>
        <Link to="show/create" style={buttonStyle}>Add Show</Link>
      </div>

      <div style={moviesContainerStyle}>
        {movies.map((movie) => (
          <div key={movie.id} style={movieCardStyle}>
            <Link to={`show/${movie.id}`} style={{ textDecoration: 'none' }}>
              <img
                src={`http://localhost:8000/api/movie/images?filePath=${movie.poster}`}
                alt={movie.name}
                style={posterStyle}
              />
              <h3 style={movieTitleStyle}>{movie.name}</h3>
              <p style={movieGenreStyle}>Genre: {movie.genre}</p>
              <p style={movieDescriptionStyle}>{movie.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}


const navbarStyle = {
  display: "flex",
  justifyContent: "space-around",
  padding: "10px",
  backgroundColor: "#f1f1f1",
  borderBottom: "1px solid #ddd",
};

const buttonStyle = {
  padding: "8px 12px",
  color: "#333",
  textDecoration: "none",
  fontWeight: "bold",
};

const moviesContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
  padding: "20px",
};

const movieCardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "220px",
  margin: "10px",
};

const posterStyle = {
  width: "100%",
  height: "300px", 
  borderRadius: "8px 8px 0 0",
  marginBottom: "10px",
  objectFit: "cover", 
};

const movieTitleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
};

const movieGenreStyle = {
  fontSize: "14px",
  color: "#666",
};

const movieDescriptionStyle = {
  fontSize: "14px",
  color: "#666",
};

export default AdminPage;
