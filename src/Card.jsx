import React from 'react';
import './Card.css'; // Import the CSS file for styling

const Card = ({ imageSrc }) => {
  return (
    <div className="card">
      <img src={imageSrc} className="card-image" />

    </div>
  );
};

export default Card;
