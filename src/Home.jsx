// Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('City name is required');
      return;
    }
    navigate(`/weather/${city}`);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError('');
          }}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
export default Home;