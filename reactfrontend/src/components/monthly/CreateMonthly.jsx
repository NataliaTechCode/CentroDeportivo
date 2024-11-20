import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DatePicker } from "@material-ui/pickers";
import "../../styles/Detachable.css";
import { IoIosArrowForward } from "react-icons/io";

const URI = "http://localhost:4000/api/mensualidad";
const URIS = "http://localhost:4000/api/estudiante";
const URID = "http://localhost:4000/api/deporte";
const URIH = "http://localhost:4000/api/horario";

const CompCreateMonthly = () => {
  const [student, setStudent] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentName, setStudentName] = useState("");
  const [ci, setCi] = useState("");
  const [sport, setSport] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");
  const [sportName, setSportName] = useState("");
  const [startdate, setStartdate] = useState(new Date());
  const [enddate, setEnddate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [scheduleName, setScheduleName] = useState("");
  const [state, setState] = useState("Disponible");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  //obtener estudiante, deporte, horario
  useEffect(() => {
    fetch(URIS)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
      })
      .catch((error) => console.error("Error al obtener estudiantes:", error));
  }, []);

  useEffect(() => {
    fetch(URID)
      .then((response) => response.json())
      .then((data) => {
        setSport(data);
      })
      .catch((error) => console.error("Error al obtener deportes:", error));
  }, []);

  useEffect(() => {
    fetch(URIH)
      .then((response) => response.json())
      .then((data) => {
        setSchedule(data);
      })
      .catch((error) => console.error("Error al obtener horarios:", error));
  }, []);

  //Obtener dato del estudiante, deporte, horario
  const handleChangestudent = (e) => {
    const selectedId = e.target.value;
    setSelectedStudent(selectedId);

    const selectedStudentObj = student.find(
      (student) => student.idstudent === selectedId
    );
    if (selectedStudentObj) {
      setCi(selectedStudentObj.ci);
      setStudentName(
        `${selectedStudentObj.name} ${selectedStudentObj.lastname}`
      );
    }
  };

  const handleChangesport = (e) => {
    const selectedId = e.target.value;
    setSelectedSport(selectedId);

    const selectedSportObj = sport.find(
      (sport) => sport.idsport === selectedId
    );
    if (selectedSportObj) {
      setSportName(selectedSportObj.namesport);
      // console.log(selectedSportObj.namesport)
    }
  };

  const handleChangeschedule = (e) => {
    const selectedId = e.target.value;
    setSelectedSchedule(selectedId);

    const selectedScheduleObj = schedule.find(
      (schedule) => schedule.idschedule === selectedId
    );
    if (selectedScheduleObj) {
      setScheduleName(
        `${selectedScheduleObj.starttime} ${selectedScheduleObj.endtime}`
      );
    }
  };

  //Procedimiento guardar
  const Store = async (e) => {
    e.preventDefault();
    await axios.post(URI, {
      student: studentName,
      ci: ci,
      sport: sportName,
      startdate: startdate,
      enddate: enddate,
      schedule: scheduleName,
      state: state,
    });
    navigate("/monthly");
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Container>
      <div>
        <h1>Añadir Mensualidad</h1>
        <form onSubmit={Store}>
          <div class="form-row">
            <div class="form-column">
              <div className="mb-3">
                <label className="form-label">Estudiante: </label>
                <div className="select-container">
                  <select
                    value={selectedStudent}
                    onChange={handleChangestudent}
                    onClick={toggleOpen} // Detectar clic para abrir/cerrar
                    className="form-control"
                  >
                    <option value="">Estudiantes:</option>
                    {student.map((student) => (
                      <option key={student.id} value={student.idstudent}>
                        {`${student.name} ${student.lastname}`}
                      </option>
                    ))}
                  </select>
                  <IoIosArrowForward
                    className={`arrow-icon ${isOpen ? "open" : ""}`} // Cambia la clase según el estado
                  />
                </div>
              </div>
            </div>

            <div class="form-column">
              <div className="mb-3">
                <label className="form-label">CI: </label>
                <input
                  value={ci}
                  readOnly
                  onChange={(e) => setCi(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-column">
              <div className="mb-3">
                <label className="form-label">Deporte: </label>
                <div className="select-container">
                  <select
                    value={selectedSport}
                    onChange={handleChangesport}
                    onClick={toggleOpen} // Detectar clic para abrir/cerrar
                    className="form-control"
                  >
                    <option value="">Deportes:</option>
                    {sport.map((sport) => (
                      <option key={sport.id} value={sport.idsport}>
                        {sport.namesport}
                      </option>
                    ))}
                  </select>
                  <IoIosArrowForward
                    className={`arrow-icon ${isOpen ? "open" : ""}`} // Cambia la clase según el estado
                  />
                </div>
              </div>
            </div>
            <div class="form-column">
              <div className="mb-3">
                <label className="form-label">Horario: </label>
                <div className="select-container">
                  <select
                    value={selectedSchedule}
                    onChange={handleChangeschedule}
                    onClick={toggleOpen} // Detectar clic para abrir/cerrar
                    className="form-control"
                  >
                    <option value="">Horarios:</option>
                    {schedule.filter((schedule) => schedule.sport === sportName)
                      .length > 0 ? (
                      schedule
                        .filter((schedule) => schedule.sport === sportName)
                        .map((schedule) => (
                          <option key={schedule.id} value={schedule.idschedule}>
                            {new Date(schedule.starttime).toLocaleString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            ) +
                              " - " +
                              new Date(schedule.endtime).toLocaleString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                          </option>
                        ))
                    ) : (
                      <option value="">
                        No se encuentran horarios disponibles en este momento.
                      </option>
                    )}
                  </select>
                  <IoIosArrowForward
                    className={`arrow-icon ${isOpen ? "open" : ""}`} // Cambia la clase según el estado
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-column">
              <div className="mb-3">
                <label className="form-label">Fecha de inicio: </label>
                <DatePicker
                  value={startdate}
                  onChange={(date) => setStartdate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                />
              </div>
            </div>
            <div class="form-column">
              <div className="mb-3">
                <label className="form-label">Fecha de finalización: </label>
                <DatePicker
                  value={enddate}
                  onChange={(date) => setEnddate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Estado: </label>
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>

          <button type="subimit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    </Container>
  );
};
const Container = styled.div`
  margin: 70px 200px 200px 200px;
  label {
    font-weight: 600;
    color: #434c4b;
  }
`;

export default CompCreateMonthly;
