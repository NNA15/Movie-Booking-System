import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        username,
        password,
      });
      const token = response.data;
      localStorage.setItem('token', token);

      const jwtDecoded = jwtDecode(token);
      const role = jwtDecoded.role;

      if (role === 'ADMIN') {
        navigate('/admin');
      } else if (role === 'USER') {
        navigate('/user');
      } else {
        console.log('Invalid Role');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input 
              type="email" 
              id="email" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              placeholder="Enter your Email"
              style={styles.input} 
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Enter your Password" 
              style={styles.input} 
            />
          </div>
          <button type="submit" style={styles.submitButton}>Login</button>
        </form>
        
        <div style={styles.footer}>
          <button onClick={handleSignUp} style={styles.linkButton}>Sign Up</button>
          <button onClick={handleForgotPassword} style={styles.linkButton}>Forgot Password</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '26px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginTop: '5px',
    boxSizing: 'border-box',
  },
  submitButton: {
    padding: '14px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#007BFF',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginTop: '10px',
  },
};

export default Login;