import React from 'react';
import { Link } from 'react-router-dom';
import customButton from 'hurdle\client\src\App.css';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Hurdle</h1>
      <p>Start messaging with people around the world</p>
      
      {/* "Start Messaging" button */}
      <Link to="hurdle\client\src\pages\signup.jsx">
        <button>Get Started</button>
      </Link>
    </div>
  );
}

export default HomePage;
