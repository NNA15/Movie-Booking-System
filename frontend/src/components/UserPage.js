import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa"; 

const UserPage = () => {
  const [movies, setMovies] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false); 

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

  const handleUserMenuToggle = () => {
    setShowUserMenu((prev) => !prev);
  };

  return (
    <div style={styles.userPage}>
      <header style={styles.header}>
        <h1 style={styles.h1}>Booking Movie System</h1>
        <div style={styles.headerRight}>
          <div>
            <Link to="/myticket" style={styles.myTicketButton}>
              My Tickets
            </Link>
          </div>
          <div style={styles.userMenuContainer}>
            <FaUser style={styles.userIcon} onClick={handleUserMenuToggle} />
            {showUserMenu && (
              <div style={styles.userMenu}>
                <Link to="/user/info" style={styles.userMenuItem}>
                  User Information
                </Link>
                <Link to="/user/change-password" style={styles.userMenuItem}>
                  Change Password
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login"; 
                  }}
                  style={styles.userMenuItem}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div style={styles.movieList}>
        {movies.map((movie, index) => (
          <div key={movie.id} style={styles.movieCard}>
            <img
              src={`http://localhost:8000/api/movie/images?filePath=${movie.poster}`}
              alt={movie.name}
              style={styles.moviePoster}
            />
            <h2 style={styles.movieTitle}>{movie.name}</h2>
            <p style={styles.movieDetails}>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p style={styles.movieDetails}>
              <strong>Duration:</strong> {movie.duration} minutes
            </p>
            <div style={styles.movieActions}>
              <button style={styles.likeButton}>👍 Like</button>
              <Link
                to={`/show/${movie.id}`}
                style={{ ...styles.buyTicketButton }}
              >
                Buy Tickets
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  userPage: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f7f7f7",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  h1: {
    color: "#333",
  },
  myTicketButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  userMenuContainer: {
    position: "relative",
  },
  userIcon: {
    fontSize: "24px",
    cursor: "pointer",
    color: "#333",
  },
  userMenu: {
    position: "absolute",
    top: "30px",
    right: "0",
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  userMenuItem: {
    display: "block",
    padding: "10px 20px",
    textDecoration: "none",
    color: "#333",
    cursor: "pointer",
  },
  userMenuItemHover: {
    backgroundColor: "#f0f0f0",
  },
  movieList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  movieCard: {
    width: "200px",
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  moviePoster: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  movieTitle: {
    fontSize: "18px",
    color: "#333",
  },
  movieDetails: {
    margin: "5px 0",
    fontSize: "14px",
    color: "#666",
  },
  movieActions: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  likeButton: {
    padding: "8px 10px",
    fontSize: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#3b5998",
    color: "white",
  },
  buyTicketButton: {
    padding: "8px 10px",
    fontSize: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#e91e63",
    color: "white",
  },
};

export default UserPage;
