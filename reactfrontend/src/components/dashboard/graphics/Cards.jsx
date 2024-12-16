import React from "react";
import "../../../styles/Cards.css";
import { FaPersonRunning } from "react-icons/fa6";

const Cards = ({ title, value, color }) => {
  return (
    <div className="cards-container">
      <div className="card">
        <div className="card-icon">
          <FaPersonRunning color={color} size={40} />
        </div>
        <div className="card-content">
          <h2>{value}</h2>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
