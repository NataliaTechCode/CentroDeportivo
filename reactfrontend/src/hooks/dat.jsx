// import React, { useEffect, useState } from "react";
// import { Datos } from "./datoss";
import useDatos from "./datoss";

export default function OtroArchivo() {
  const { students, allstudents, allcoach } = useDatos();
  //circulo
  const { studentSports, scheduleSports, monthlySports, mothSports } = useDatos(
    []
  );

  //para las barras horizaontales
  //   console.log(scheduleSports);

  //para las barras horizaontales
  console.log(monthlySports);

  return (
    <div>
      <p>Estudiantes activos: {students}</p>
      <p>Todos los estudiantes: {allstudents}</p>
      <p>Todos los coaches: {allcoach}</p>
    </div>
  );
}
