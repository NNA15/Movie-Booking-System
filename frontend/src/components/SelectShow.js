import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SelectShow = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [cinemaData, setCinemaData] = useState([]);
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/show/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCinemaData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [movieId]);

  useEffect(() => {
    if (selectedDate) {
      const filtered = cinemaData.map(cinema => ({
        ...cinema,
        shows: cinema.shows.filter(show => {
          const showDate = new Date(show.timeStart);
          const showDateString = showDate.toISOString().split('T')[0]; 

          return showDateString === selectedDate; 
        }),
      })).filter(cinema => cinema.shows.length > 0); 

      setFilteredData(filtered);
    }
  }, [selectedDate, cinemaData]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const generateDateButtons = () => {
    const today = new Date();
    const buttons = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Format the date to yyyy-mm-dd
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        
        buttons.push(
            <button
                key={i}
                onClick={() => handleDateChange(dateString)}
                className={`date-button ${selectedDate === dateString ? 'selected' : ''}`}
            >
                {date.toLocaleDateString()}  
            </button>
        );
    }
    return buttons;
};


  const handleShowClick = (show) => {
    navigate(`/seat/${show.id}`, { state: { showDetails: show } });
  };

  return (
    <div className="select-show-container">
      <div className="date-selection">
        <h3>Select a Date</h3>
        <div className="date-buttons">
          {generateDateButtons()}  
        </div>
      </div>

      <div className="cinema-shows">
        {filteredData.length === 0 ? (
          <p>No shows available for this date.</p>
        ) : (
          filteredData.map((cinema, index) => (
            <div key={index} className="cinema-card">
              <h3>{cinema.cinemaName} - {cinema.cinemaLocation}</h3>
              <div className="show-times">
                {cinema.shows.map(show => (
                  <button
                    key={show.id}
                    className="show-time-button"
                    onClick={() => handleShowClick(show)}
                  >
                    {new Date(show.timeStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <style>
        {`
          /* Base styles for the container */
          .select-show-container {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f9f9f9;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }

          /* Styling for the date selection section */
          .date-selection {
            margin-bottom: 20px;
          }

          .date-selection h3 {
            font-size: 18px;
            color: #333;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .date-buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr); /* Display buttons in 4 columns */
            gap: 10px;
            margin-top: 10px;
          }

          /* Styling for the individual date buttons */
          .date-button {
            padding: 10px;
            background-color: #f1f1f1;
            border: 1px solid #ddd;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            transition: background-color 0.3s;
          }

          .date-button.selected {
            background-color: #007bff;
            color: white;
          }

          .date-button:hover {
            background-color: #ddd;
          }

          /* Styling for the cinema shows section */
          .cinema-shows {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .cinema-card {
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .cinema-card h3 {
            font-size: 16px;
            color: #333;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .cinema-card p {
            font-size: 14px;
            color: #666;
          }

          /* Show time button styles */
          .show-times {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 10px;
          }

          .show-time-button {
            padding: 8px 12px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s;
          }

          .show-time-button:hover {
            background-color: #218838;
          }
        `}
      </style>
    </div>
  );
};

export default SelectShow;
