import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Hurdle</h1>
      <p>Start messaging with people around the world</p>
      
      {/* "Start Messaging" button */}
      <Link to="/messaging">
        <button>Start Messaging</button>
      </Link>
    </div>
  );
}

export default HomePage;
