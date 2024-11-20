import React from 'react';
import "../../../styles/Cards.css"
import { FaUserGraduate, FaSwimmer } from 'react-icons/fa';

const Cards = () => {
  return (
    <div className="cards-container">
      <div className="card">
        <div className="card-icon">
          <FaUserGraduate size={40} />
        </div>
        <div className="card-content">
          <h2>100</h2>
          <p>Estudiantes</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
