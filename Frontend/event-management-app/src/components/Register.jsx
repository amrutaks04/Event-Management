import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const handleChange = e => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('https://eventbackend-1.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(register)
      });
      if (response.ok) {
        alert("User registered!!");
        setRegister({
          username: '',
          email: '',
          password: ''
        });
        navigate('/login');
      } else {
        alert("Error occurred. Failed to Register!");
      }
    } catch (error) {
      console.error('Error adding User:', error);
      alert('Error. Please try again later.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="centered-container">
      <div className="registration-container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={register.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={register.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={register.password}
                onChange={handleChange}
                required
              />
              {register.password && (
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="password-icon"
                />
              )}
            </div>
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <div className="extra-info">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
          <p>By creating an account or logging in, you agree to Sportopia's <a href="#">Conditions of Use</a> and <a href="#">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;



