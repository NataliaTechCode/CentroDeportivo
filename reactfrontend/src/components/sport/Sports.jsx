import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { IoMdInformationCircle } from "react-icons/io";
import styled from "styled-components";
import "./SportsList.css";

const SportsList = () => {
  const [sports, setSports] = useState([]); // Estado para almacenar los deportes
  const navigate = useNavigate();

  // useEffect para cargar los datos de la API cuando el componente se monta
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/deporte");
        const data = await response.json();
        setSports(data); // Guarda los deportes en el estado
      } catch (error) {
        console.error("Error al cargar los deportes:", error);
      }
    };

    fetchSports();
  }, []); // Solo se ejecuta una vez al montar el componente

  const handleNavigate = (namesport) => {
    navigate(`/sport/${namesport}`);
  };

  return (
    <Container>
      <div className="button-container">
        <Link to="/sport" className="button-schedule">
          <IoMdInformationCircle />
          Deportes
        </Link>
      </div>
      <div className="sports-grid">
        {sports.map((sport) => (
          <div
            key={sport.namesport}
            className="sport-card"
            style={{
              backgroundImage: `url(${
                sport.imageUrl ||
                "https://s.france24.com/media/display/6aca8d1a-7783-11ea-9cf2-005056bf87d6/w:1280/p:16x9/WEB%2005ABR%20DEPORTES%20PORTADA%20FOTO.jpg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => handleNavigate(sport.namesport)}
          >
            <div className="overlay">
              <h3>{sport.namesport}</h3>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 0px 100px 0px 100px;
`;

export default SportsList;
