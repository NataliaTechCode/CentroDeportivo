import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const URI = "http://localhost:4000/api/horario/";

const CompShowScheduleSport = () => {
  const { sportName } = useParams();
  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/horario");
      const data = await response.json();

      // Filtrar los horarios para que solo coincidan con el deporte en la URL
      const filteredSchedules = data.filter(
        (schedule) => schedule.sport.toLowerCase() === sportName.toLowerCase()
      );

      setSchedules(filteredSchedules);
    } catch (error) {
      console.error("Error al cargar los horarios:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [sportName]);

  // Modificar deleteSchedule para llamar fetchSchedules
  const deleteSchedule = async (id) => {
    try {
      await axios.delete(`${URI}${id}`);
      await fetchSchedules(); // Llamar fetchSchedules después de eliminar
    } catch (error) {
      console.error("Error al eliminar el horario:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="button-container">
            <Link to="/sport/schedule/create" className="button-add">
              <IoMdAddCircle /> Añadir
            </Link>
          </div>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Hora de Inicio</th>
                  <th>Hora Fin</th>
                  <th>Días de semana</th>
                  <th>Limite de Estudiantes</th>
                  <th>Total de Estudiantes</th>
                  <th>Entrenador</th>
                  <th>Deporte</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>{schedule.idschedule}</td>
                    <td>
                      {new Date(schedule.starttime).toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td>
                      {new Date(schedule.endtime).toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td>{schedule.dayWeek.join(", ")}</td>
                    <td>{schedule.limitStudents}</td>
                    <td>{schedule.totalstudents}</td>
                    <td>{schedule.coach}</td>
                    <td>{schedule.sport}</td>
                    <td>
                      {" "}
                      {schedule.totalstudents >= schedule.limitStudents ? (
                        <span style={{ color: "red" }}>No disponible</span>
                      ) : (
                        <span style={{ color: "green" }}>Disponible</span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/schedule/edit/${schedule.id}`}
                        className="button-icon"
                        id="edit"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => deleteSchedule(schedule.id)}
                        className="button-icon"
                        id="delete"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompShowScheduleSport;
