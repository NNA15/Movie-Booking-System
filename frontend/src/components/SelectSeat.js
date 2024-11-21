import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function SelectSeat() {
    const { state } = useLocation();
    const { showDetails } = state; 
    const { showId } = useParams();
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        axios.get(`http://localhost:8000/api/seat/${showId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => setSeats(response.data))
        .catch(error => console.error("Error fetching seats:", error));
    }, [showId]);

    const handleSeatClick = (seat) => {
        if (seat.available) {
            setSelectedSeats(prevSelected => {
                if (prevSelected.some(s => s.id === seat.id)) {
                    return prevSelected.filter(s => s.id !== seat.id);
                } else {
                    return [...prevSelected, seat];
                }
            });
        }
    };

    const handleBuyClick = () => {
        if (selectedSeats.length > 0) {
            navigate('/booking-info', { state: { selectedSeats, showDetails } });
        }
    };

    return (
        <div style={styles.selectSeatContainer}>
            <div style={styles.screen}>Screen</div>
            <div style={styles.seatsGrid}>
                {seats.map((seat) => (
                    <div
                        key={seat.id}
                        onClick={() => handleSeatClick(seat)}
                        style={{
                            ...styles.seat,
                            cursor: seat.available ? 'pointer' : 'not-allowed',
                            position: 'relative',
                            backgroundColor: seat.available ? 'green' : 'gray', 
                        }}
                    >
                        {seat.seatNumber}
                        {selectedSeats.some(s => s.id === seat.id) && (
                            <span style={styles.checkmark}>✓</span>
                        )}
                    </div>
                ))}
            </div>
            {selectedSeats.length > 0 && (
                <div style={styles.priceInfo}>
                    Total Price: {selectedSeats.reduce((sum, seat) => sum + seat.price, 0)} VND
                </div>
            )}
            <button 
                onClick={handleBuyClick} 
                disabled={selectedSeats.length === 0} 
                style={{
                    ...styles.buyButton, 
                    backgroundColor: selectedSeats.length > 0 ? 'blue' : 'gray',
                    cursor: selectedSeats.length > 0 ? 'pointer' : 'not-allowed'
                }}
            >
                Buy
            </button>
        </div>
    );
}

const styles = {
    selectSeatContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px',
    },
    screen: {
        width: '80%',
        backgroundColor: '#ccc',
        color: '#333',
        textAlign: 'center',
        padding: '10px',
        fontWeight: 'bold',
        marginBottom: '20px',
        borderRadius: '5px',
    },
    seatsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))',
        gap: '10px',
        width: '80%',
        maxWidth: '600px',
    },
    seat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
        width: '40px',
        borderRadius: '5px',
        fontWeight: 'bold',
        color: 'white',
        userSelect: 'none',
        transition: 'transform 0.2s, background-color 0.2s',
    },
    checkmark: {
        position: 'absolute',
        top: '2px',
        right: '2px',
        color: 'deepskyblue',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    priceInfo: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#333',
        textAlign: 'center',
    },
    buyButton: {
        marginTop: '20px',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16px',
    },
};

export default SelectSeat;
