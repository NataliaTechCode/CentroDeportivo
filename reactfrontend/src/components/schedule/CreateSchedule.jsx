import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../styles/Detachable.css";

import { IoIosArrowForward } from "react-icons/io";
import { TimePicker } from "@material-ui/pickers";

const URI = "http://localhost:4000/api/horario";
const URIE = "http://localhost:4000/api/entrenador";
const URID = "http://localhost:4000/api/deporte";

const CompCreateSchedule = () => {
  const [starttime, setStarttime] = useState();
  const [endtime, setEndtime] = useState();
  const [dayWeek, setDayWeek] = useState([]);
  const [limitStudents, setLimitStudents] = useState(8);
  const [totalstudents, setTotalstudents] = useState(0);
  const [coach, setCoach] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState("");
  const [coachName, setCoachName] = useState("");
  const [sport, setSport] = useState([]);
  const [sportName, setSportName] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  //obtener entrenadores y deportes
  useEffect(() => {
    fetch(URIE)
      .then((response) => response.json())
      .then((data) => {
        setCoach(data);
      })
      .catch((error) => console.error("Error al obtener entrenadores:", error));
  }, []);

  useEffect(() => {
    fetch(URID)
      .then((response) => response.json())
      .then((data) => {
        setSport(data);
      })
      .catch((error) => console.error("Error al obtener deportes:", error));
  }, []);

  //Obtener nombre del entrendaro y deporte
  const handleChangecoach = (e) => {
    const selectedId = e.target.value;
    setSelectedCoach(selectedId);

    const selectedCoachObj = coach.find(
      (coach) => coach.idcoach === selectedId
    );
    if (selectedCoachObj) {
      setCoachName(selectedCoachObj.namecoach); // Guarda solo el namecoach
    }
  };

  const handleChangesport = (e) => {
    const selectedId = e.target.value;
    setSelectedSport(selectedId);

    const selectedSportObj = sport.find(
      (sport) => sport.idsport === selectedId
    );
    if (selectedSportObj) {
      setSportName(selectedSportObj.namesport); // Guarda solo el namecoach
    }
  };

  //seleccionador de dias
  const handleDayChange = (day) => {
    if (dayWeek.includes(day)) {
      setDayWeek(dayWeek.filter((selectedDay) => selectedDay !== day));
    } else {
      setDayWeek([...dayWeek, day]);
    }
  };

  //Procedimiento guardar
  const Store = async (e) => {
    e.preventDefault();
    await axios.post(URI, {
      starttime: starttime,
      endtime: endtime,
      dayWeek: dayWeek,
      limitStudents: limitStudents,
      totalstudents: totalstudents,
      coach: coachName,
      sport: sportName,
    });
    navigate("/schedule");
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Container>
      <div>
        <h1>Añadir Horario</h1>
        <form onSubmit={Store}>
          <div class="form-row">
            <div className="form-column">
              <label className="form-label">Entrenador: </label>
              <div className="select-container">
                <select
                  value={selectedCoach}
                  onChange={handleChangecoach}
                  onClick={toggleOpen} // Detectar clic para abrir/cerrar
                  className="form-control"
                >
                  <option value="">Entrenadores:</option>
                  {coach.map((coach) => (
                    <option key={coach.id} value={coach.idcoach}>
                      {coach.namecoach}
                    </option>
                  ))}
                </select>
                <IoIosArrowForward
                  className={`arrow-icon ${isOpen ? "open" : ""}`} // Cambia la clase según el estado
                />
              </div>
            </div>

            <div class="form-column">
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
          <div class="form-row">
            <div class="form-column">
              <label className="form-label">Horario de Inicio: </label>
              <TimePicker
                onChange={setStarttime}
                value={starttime}
                className="form-control"
                disableClock={true}
              />
            </div>
            <div class="form-column">
              <label className="form-label">Horario Fin: </label>
              <TimePicker
                onChange={setEndtime}
                value={endtime}
                className="form-control"
                disableClock={true}
              />
            </div>
          </div>

          <div class="form-row">
            {/* <div class="form-column">
              <label className="form-label">Total de Estudiantes: </label>
              <input
                value={totalstudents}
                onChange={(e) => setTotalstudents(e.target.value)}
                type="text"
                className="form-control"
              />
            </div> */}
            <div class="form-column">
              <label className="form-label">Límite de Estudiantes: </label>
              <input
                value={limitStudents}
                onChange={(e) => setLimitStudents(e.target.value)}
                type="number" // Cambiado a "number"
                className="form-control"
                min="1" // Establece un límite mínimo (opcional)
                step="1" // Incrementa o decrementa de uno en uno
              />
            </div>

            <div class="form-column">
              <label className="form-label">Días de semana:</label>
              <div className="days-container">
                {daysOfWeek.map((day) => (
                  <label key={day} className="day-label">
                    <input
                      type="checkbox"
                      value={day}
                      checked={dayWeek.includes(day)}
                      onChange={() => handleDayChange(day)}
                      className="day-checkbox"
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div class="form-field"></div>

          <button type="subimit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    </Container>
  );
};
const Container = styled.div`
  margin: 20px 200px 200px 200px;
  label {
    font-weight: 600;
    color: #434c4b;
  }
`;

export default CompCreateSchedule;
