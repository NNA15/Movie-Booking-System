import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookingInfo() {
    const { state } = useLocation(); 
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [showDetails, setShowDetails] = useState(null);

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const token = localStorage.getItem('token'); 
    
                if (state.showDetails && state.showDetails.id) {
                    const showId = state.showDetails.id;
                    const response = await axios.get(`http://localhost:8000/api/show/${showId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    setShowDetails(response.data);
                } else {
                    console.error('Invalid showDetails or missing id');
                }
            } catch (error) {
                console.error('Error fetching show details:', error);
                alert('Failed to fetch show details!');
            }
        };
    
        if (state.showDetails && state.showDetails.id) {
            fetchShowDetails();
        }
    }, [state.showDetails?.id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !phone) {
            alert("Please fill in all the fields!");
            return;
        }
    
        
        const bookingData = {
            total: state.selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
            seatId: state.selectedSeats.map((seat) => seat.id),
            name,
            phone,
        };
    
        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post("http://localhost:8000/api/booking", bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
    
            console.log("Booking successful:", response.data);
            getUrlPayment(response.data.total, response.data.bookingCode);
            alert("Booking successfully created!");
            navigate('/booking-success'); 
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("Failed to create booking. Please try again!");
        }
    };
    const getUrlPayment = async (amount, bookingCode) => {
        try {
          
          const apiUrl = "http://localhost:8000/api/payment/vn-pay";
      
          
          const response = await axios.get(apiUrl, {
            params: {
              amount: amount,
              bankCode: "NCB",
              bookingCode: bookingCode,
            },
          });
      
          console.log("URL Payment:", response.data);
      
          
          if (response.data.paymentUrl) {
            window.open(response.data.paymentUrl, "_blank");
          } else {
            console.error("Payment URL does not exit");
          }
      
          
          return response.data;
        } catch (error) {
          console.error("Error fetching payment URL:", error);
          throw error;
        }
      };
      

    return (
        <div style={styles.bookingContainer}>
            <h2>Booking Information</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.paymentMethod}>
                    <label>Payment Method: VN-Pay</label>
                </div>

                {showDetails && (
                    <div style={styles.showDetails}>
                        <p>Movie Name: {showDetails.movieName}</p>
                        <p>Location: {showDetails.location}</p>
                        <p>Room Number: {showDetails.roomNumber}</p>
                        <p>Start Time: {formatDate(showDetails.timeStart)}</p>
                        <p>Duration: {showDetails.movieDuration} minutes</p>
                    </div>
                )}

                <div style={styles.selectedSeats}>
                    <p>Seats:</p>
                    <div style={styles.seatsRow}>
                        {state.selectedSeats.map(seat => (
                            <span key={seat.id} style={styles.seatItem}>
                                {seat.seatNumber}
                            </span>
                        ))}
                    </div>
                    <p>Total Price: {state.selectedSeats.reduce((sum, seat) => sum + seat.price, 0)} VND</p>
                </div>

                <button type="submit" style={styles.buyButton}>Confirm Booking</button>
            </form>
        </div>
    );
}

const styles = {
    bookingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '50%',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '15px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginTop: '5px',
        outline: 'none',
    },
    paymentMethod: {
        fontSize: '16px',
        marginBottom: '15px',
    },
    showDetails: {
        fontSize: '16px',
        lineHeight: '1.6',
        marginBottom: '15px',
    },
    selectedSeats: {
        fontSize: '16px',
        lineHeight: '1.6',
    },
    seatsRow: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '15px',
    },
    seatItem: {
        padding: '8px 15px',
        backgroundColor: '#007BFF',
        color: 'white',
        borderRadius: '5px',
        fontSize: '14px',
    },
    buyButton: {
        marginTop: '20px',
        padding: '12px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default BookingInfo;
