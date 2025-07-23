# SkyCast - Find My Weather
## Date: 23-07-2025
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:
### App.jsx:
```
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Weather from './Weather';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather/:city" element={<Weather />} />
    </Routes>
  );
}

export default App;
```

### Home.jsx:
```
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
```
### main.jsx:
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```
### Weather.jsx:
```
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Weather() {
  const { city } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_KEY = '62b27f79848d4cae8b673437251207';
  useEffect(() => {
    if (!city) {
      navigate('/');
    }
  }, [city, navigate]);

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    setError('');
    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to fetch weather data. Please check the city name.');
        setLoading(false);
      });
  }, [city]);

  const tempFahrenheit = useMemo(() => {
    return data ? (data.current.temp_c * 9) / 5 + 32 : null;
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="weather-container">
      <h2>Weather in {data.location.name}</h2>
      <p>Temperature: {data.current.temp_c} °C / {tempFahrenheit.toFixed(2)} °F</p>
      <p>Humidity: {data.current.humidity}%</p>
      <p>Wind Speed: {data.current.wind_kph} kph</p>
      <p>Condition: {data.current.condition.text}</p>
    </div>
  );
}

export default Weather;
```
### index.css:
```
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #eef2f3;
}

.container, .weather-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
}

input {
  padding: 10px;
  width: 70%;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
}
```
## Output:
<img width="1278" height="434" alt="Screenshot 2025-07-23 085735" src="https://github.com/user-attachments/assets/2d9b6b6e-af6b-41ed-819a-c6ed298e984b" />

<img width="955" height="375" alt="Screenshot 2025-07-23 100258" src="https://github.com/user-attachments/assets/87d70dd6-1886-4db9-9e25-09fb89569bdd" />


## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
