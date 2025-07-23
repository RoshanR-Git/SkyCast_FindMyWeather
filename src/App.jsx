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

