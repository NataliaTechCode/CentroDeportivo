import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/State.css"

import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { FaEye } from "react-icons/fa";

const URI = "http://localhost:4000/api/mensualidad/";
const URIE = "http://localhost:4000/api/estudiante/";

const CompShowMonthly = () => {
  const [monthlies, setMonthly] = useState([]);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    getMonthlies();
    getStudents();
  }, []);

  //Procedimiento para mostrar todos los mensualidades
  const getMonthlies = async () => {
    const res = await axios.get(URI);
    setMonthly(res.data);
    console.log(res.data);
  };

  // Fetch student data
  const getStudents = async () => {
    const res = await axios.get(URIE);
    setStudents(res.data);
  };

  const deleteMonthly = async (id) => {
    console.log(id);
    await axios.delete(`${URI}${id}`);
    getMonthlies();
  };

  function formatSchedule(schedule) {
    // Dividir el string por el espacio en blanco para separar las fechas
    if (!schedule) return "Horario sin asignar";
    const [start, end] = schedule.split(" ");

    // Convertir las fechas de string a objetos Date
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Función para formatear la hora en formato AM/PM
    const formatTime = (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convertir el reloj de 24h a 12h
      const formattedMinutes = minutes.toString().padStart(2, "0"); // Asegurar que siempre haya 2 dígitos
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    // Formatear las horas de inicio y fin
    const startTime = formatTime(startDate);
    const endTime = formatTime(endDate);

    // Devolver el formato deseado
    return `${startTime} - ${endTime}`;
  }

  const getSubscriptionStatus = (endDate) => {
    const endDateObject = new Date(endDate); // Convert the endDate to a Date object
    const currentDate = new Date(); // Get the current system date
  
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = endDateObject - currentDate;
  
    // Convert milliseconds to days
    const remainingDays = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
  
    // Determine the status and corresponding color
    let color = "";
    if (remainingDays > 7) {
      color = "green"; // Activa
    } else if (remainingDays >= 0) {
      color = "yellow"; // Por Vencer
    } else {
      color = "red"; // Vencida
    }
  
    // Return a circle with the corresponding color
    return <span className={`status-circle ${color}`} />;
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="button-container">
            <Link to="/monthly/create" className="button-add">
              <IoMdAddCircle /> Añadir
            </Link>
            <Link to="/monthly/state" className="button-schedule">
              <FaEye /> Ver estado
            </Link>
          </div>
          <div class="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Estudiante</th>
                  <th>CI</th>
                  <th>Deporte</th>
                  <th>Horario</th>
                  <th>Fecha de inicio</th>
                  <th>fecha de finalización</th>
                  <th>Foto</th>
                  <th>state</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {monthlies.map((monthly) => {
                  const student = students.find((s) => s.ci === monthly.ci);
                  const studentPhoto = student ? student.photostudent : "";

                  return (
                    <tr key={monthly.idmonthly}>
                      <td>{monthly.idmonthly}</td>
                      <td>{monthly.student}</td>
                      <td>{monthly.ci}</td>
                      <td>{monthly.sport}</td>
                      <td>{formatSchedule(monthly.schedule)}</td>
                      <td>{monthly.startdate.slice(0, 10)}</td>
                      <td>{monthly.enddate.slice(0, 10)}</td>
                      <td>
                        {studentPhoto ? (
                          <img
                            src={studentPhoto}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          "No Photo"
                        )}
                      </td>
                      <td>{getSubscriptionStatus(monthly.enddate)}</td>
                      <td>
                        <Link
                          to={`/monthly/edit/${monthly.id}`}
                          className="button-icon"
                          id="edit"
                        >
                          <MdEdit />
                        </Link>
                        <button
                          onClick={() => deleteMonthly(monthly.id)}
                          className="button-icon"
                          id="delete"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompShowMonthly;
