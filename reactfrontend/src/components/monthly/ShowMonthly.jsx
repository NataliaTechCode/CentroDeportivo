import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/State.css";

import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const URI = "http://localhost:4000/api/mensualidad/";
const URIE = "http://localhost:4000/api/estudiante/";

const CompShowMonthly = () => {
  const [monthlies, setMonthly] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchSport, setSearchSport] = useState("");
  const [searchCI, setSearchCI] = useState("");

  useEffect(() => {
    getMonthlies();
    getStudents();
  }, []);

  // Fetch montlhlies data
  const getMonthlies = async () => {
    const res = await axios.get(URI);
    setMonthly(res.data);
  };

  const getStudents = async () => {
    const res = await axios.get(URIE);
    setStudents(res.data);
  };

  const deleteMonthly = async (id) => {
    await axios.delete(`${URI}${id}`);
    getMonthlies();
  };

  function formatSchedule(schedule) {
    if (!schedule) return "Horario sin asignar";
    const [start, end] = schedule.split(" ");

    const startDate = new Date(start);
    const endDate = new Date(end);

    const formatTime = (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, "0");
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    const startTime = formatTime(startDate);
    const endTime = formatTime(endDate);

    return `${startTime} - ${endTime}`;
  }

  const getSubscriptionStatus = (endDate) => {
    const endDateObject = new Date(endDate);
    const currentDate = new Date();

    const differenceInMilliseconds = endDateObject - currentDate;

    const remainingDays = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    let color = "";
    if (remainingDays > 7) {
      color = "green"; // Activa
    } else if (remainingDays >= 0) {
      color = "yellow"; // Por Vencer
    } else {
      color = "red"; // Vencida
    }

    return <span className={`status-circle ${color}`} />;
  };

  const filteredMonthlies = monthlies.filter((monthly) => {
    const matchesSport = monthly.sport
      .toLowerCase()
      .includes(searchSport.toLowerCase());
    const matchesCI = monthly.ci.toString().includes(searchCI.toString()); // Ambos se convierten a cadenas
    return matchesSport && matchesCI;
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="button-container">
            <Link to="/monthly/create" className="button-add">
              <IoMdAddCircle /> Añadir
            </Link>
          </div>

          {/* Buscador */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar por deporte"
              value={searchSport}
              onChange={(e) => setSearchSport(e.target.value)}
              className="search-input"
            />
            <input
              type="number"
              placeholder="Buscar por CI"
              value={searchCI}
              onChange={(e) => setSearchCI(e.target.value)}
              className="search-input"
            />
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
                  {/* <th>Foto</th> */}
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredMonthlies.map((monthly) => {
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
                      {/* <td>
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
                      </td> */}
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
