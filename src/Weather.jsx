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
