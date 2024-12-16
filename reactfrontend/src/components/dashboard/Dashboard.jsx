// import { console } from "inspector";
import React, { useEffect, useState } from "react";

const MonthlyData = () => {
  // const [data, setData] = useState([]);

  const [sport, setSport] = useState({});
  const [sportPopular, setSportPopular] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
  const [stateMonthly, setStateMonthly] = useState({});

  const getMonthlyData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/mensualidad/");
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();

      //Deporte con mas estudiantes y total
      const totalSport = data.reduce((counter, student) => {
        const { sport } = student;
        counter[sport] = (counter[sport] || 0) + 1;
        return counter;
      }, {});

      setSport(totalSport);

      const sportWithMoreStudents = Object.keys(totalSport).reduce((a, b) =>
        totalSport[a] > totalSport[b] ? a : b
      );

      setSportPopular(sportWithMoreStudents);
      setTotalStudents(totalSport[sportWithMoreStudents]);

      //Cantidad de los estudiantes del estado de la mensualidad de cada deporte
      const totalState = data.reduce((counter, student) => {
        const { sport, state } = student;

        // Aseguramos que el deporte tenga un objeto inicializado
        if (!counter[sport]) {
          counter[sport] = { Activa: 0, "Por Vencer": 0, Vencida: 0 };
        }

        // Incrementamos el contador correspondiente al estado
        counter[sport][state] = (counter[sport][state] || 0) + 1;
        return counter;
      }, {});

      setStateMonthly(totalState);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    getMonthlyData();
  }, []);

  return (
    <div>
      {/* Tarjetas*/}

      <h2>Deporte con más estudiantes</h2>
      <p>
        {sportPopular} es el deporte con más estudiantes , con un total de{" "}
        {totalStudents} estudiantes.
      </p>

      {/* Graficos */}
      <h2>Cantidad de Estudiantes por Deporte</h2>
      <ul>
        {Object.entries(sport).map(([sport, totalSport]) => (
          <li key={sport}>
            {sport}: {totalSport}
          </li>
        ))}
      </ul>

      <h2>Cantidad de Estudiantes por Estado y Deporte</h2>
      {Object.entries(stateMonthly).map(([sport, state]) => (
        <div key={sport}>
          <h3>{sport}</h3>
          <ul>
            <li>Activa: {state.Activa}</li>
            <li>Por Vencer: {state["Por Vencer"]}</li>
            <li>Vencida: {state.Vencida}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MonthlyData;
