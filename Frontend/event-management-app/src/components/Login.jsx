
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://eventapi-mr8f.onrender.com/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (response.status === 200) {
                alert('Login Successful!');
                localStorage.setItem('username', username); 
                navigate('/home');
            } else {
                alert(result.message || 'Login failed. Please try again.');
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
            setUsername('');
            setPassword('');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>           
                <h2>Login</h2>
                {message && <div className="message">{message}</div>}
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <div className="password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {password && (
                            <FontAwesomeIcon 
                                icon={showPassword ? faEyeSlash : faEye} 
                                onClick={togglePasswordVisibility}
                                className="password-icon"
                            />
                        )}
                    </div>
                </div>
                <button type="submit">Login</button>
                <div className="extra-info">
                    <p>Don't have an account? <Link to="/register">Create one here</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;


