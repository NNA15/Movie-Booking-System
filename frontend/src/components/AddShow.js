import React, { useState, useEffect } from "react";
import axios from "axios";

function AddShow() {
  const [day, setDay] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [price, setPrice] = useState("");
  const [cinemas, setCinemas] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchCinemas();
    fetchMovies();
  }, []);

  useEffect(() => {
    if (selectedCinema) {
      fetchRooms();
    } else {
      setRooms([]);
    }
  }, [selectedCinema]);

  const fetchCinemas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/cinema", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCinemas(response.data);
    } catch (error) {
      console.error("Error fetching cinemas:", error);
    }
  };

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/movie", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/room/${selectedCinema}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const movieId = parseInt(selectedMovie, 10);
        const movie = movies.find((m) => m.id === movieId);
        if (!movie) {
            alert("Movie not found.");
            return;
        }

        const startDateTime = `${day}T${timeStart}:00`;
        const startDate = new Date(startDateTime);
        const durationInHours = movie.duration / 60;
        const endDate = new Date(startDate.getTime() + (durationInHours + 1) * 60 * 60 * 1000 + 7 * 60 * 1000 * 60);
        const endDateTime = endDate.toISOString();
        const token = localStorage.getItem("token");
        const response = await axios.post(
            "http://localhost:8000/api/show",
            {
                timeStart: startDateTime,
                timeEnd: endDateTime,
                movieId: selectedMovie,
                roomId: selectedRoom,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const showId = response.data.id;
        await createSeat(showId, price);
        alert("Show and seats added successfully!");
    } catch (error) {
        console.error("Error creating show:", error);
        alert("Failed to create show.");
    }
};


  const createSeat = async (showId, price) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/seat",
        { showId: showId, price: price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Seats created successfully!");
    } catch (error) {
      console.error("Error creating seats:", error);
      alert("Failed to create seats.");
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>Add Show</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label>Day:</label>
          <input
            type="date"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Time Start:</label>
          <input
            type="time"
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
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
                {cinema.name} - {cinema.location}
              </option>
            ))}
          </select>
        </div>
        <div style={inputGroupStyle}>
          <label>Select Room:</label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="">Select a Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                Room Number: {room.roomNumber} - Capacity: {room.capacity}
              </option>
            ))}
          </select>
        </div>
        <div style={inputGroupStyle}>
          <label>Select Movie:</label>
          <select
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="">Select a Movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.name}
              </option>
            ))}
          </select>
        </div>
        <div style={inputGroupStyle}>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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

export default AddShow;
