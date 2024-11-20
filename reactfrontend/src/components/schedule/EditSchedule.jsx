import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import "../../styles/Detachable.css";

import { IoIosArrowForward } from "react-icons/io";
import { TimePicker } from "@material-ui/pickers";

const URI = "http://localhost:4000/api/horario/";
const URIE = "http://localhost:4000/api/entrenador";
const URID = "http://localhost:4000/api/deporte";

const CompEditSchedule = () => {
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
  const { id } = useParams();

  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  // Obtener entrenadores y deportes
  useEffect(() => {
    fetch(URIE)
      .then((response) => response.json())
      .then((data) => setCoach(data))
      .catch((error) => console.error("Error al obtener entrenadores:", error));

    fetch(URID)
      .then((response) => response.json())
      .then((data) => setSport(data))
      .catch((error) => console.error("Error al obtener deportes:", error));
  }, []);

  // Obtener el horario por ID
  const getScheduleById = useCallback(async () => {
    try {
      const res = await axios.get(URI + id);
      setStarttime(res.data.starttime);
      setEndtime(res.data.endtime);
      setDayWeek(res.data.dayWeek);
      setLimitStudents(res.data.limitStudents);
      setTotalstudents(res.data.totalstudents);
      setCoachName(res.data.coach);
      setSportName(res.data.sport);

      // Buscar el ID del entrenador basado en el nombre y establecerlo
      const coachObj = coach.find((c) => c.namecoach === res.data.coach);
      if (coachObj) {
        setSelectedCoach(coachObj.idcoach);
      }

      // Buscar el ID del deporte basado en el nombre y establecerlo
      const sportObj = sport.find((s) => s.namesport === res.data.sport);
      if (sportObj) {
        setSelectedSport(sportObj.idsport);
      }
    } catch (error) {
      console.error("Error al obtener horario:", error);
    }
  }, [id, coach, sport]); // Asegúrate de incluir 'sport' en las dependencias

  useEffect(() => {
    getScheduleById();
  }, [getScheduleById]);

  // Actualizar horario
  const updateSchedule = async (e) => {
    e.preventDefault();
    await axios.put(URI + id, {
      starttime: starttime,
      endtime: endtime,
      dayWeek: dayWeek,
      limitStudents: limitStudents,
      totalstudents: totalstudents,
      coach: coachName,
      sport: sportName,
    });
    navigate("/");
  };

  // Manejar cambios
  const handleChangecoach = (e) => {
    const selectedId = e.target.value;
    setSelectedCoach(selectedId);
    const selectedCoachObj = coach.find((c) => c.idcoach === selectedId);
    if (selectedCoachObj) setCoachName(selectedCoachObj.namecoach);
  };

  const handleChangesport = (e) => {
    const selectedId = e.target.value;
    setSelectedSport(selectedId);
    const selectedSportObj = sport.find((s) => s.idsport === selectedId);
    if (selectedSportObj) setSportName(selectedSportObj.namesport);
  };

  const handleDayChange = (day) => {
    setDayWeek(
      dayWeek.includes(day)
        ? dayWeek.filter((selectedDay) => selectedDay !== day)
        : [...dayWeek, day]
    );
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Container>
      <div>
        <h1>Editar Horario</h1>
        <form onSubmit={updateSchedule}>
          <div className="form-row">
            <div className="form-column">
              <label className="form-label">Entrenador: </label>
              <div className="select-container">
                <select
                  value={selectedCoach}
                  onChange={handleChangecoach}
                  onClick={toggleOpen}
                  className="form-control"
                >
                  <option value="">Entrenadores:</option>
                  {coach.map((c) => (
                    <option key={c.idcoach} value={c.idcoach}>
                      {c.namecoach}
                    </option>
                  ))}
                </select>
                <IoIosArrowForward
                  className={`arrow-icon ${isOpen ? "open" : ""}`}
                />
              </div>
            </div>

            <div className="form-column">
              <label className="form-label">Deporte: </label>
              <div className="select-container">
                <select
                  value={selectedSport}
                  onChange={handleChangesport}
                  onClick={toggleOpen}
                  className="form-control"
                >
                  <option value="">Deportes:</option>
                  {sport.map((s) => (
                    <option key={s.idsport} value={s.idsport}>
                      {s.namesport}
                    </option>
                  ))}
                </select>
                <IoIosArrowForward
                  className={`arrow-icon ${isOpen ? "open" : ""}`}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <label className="form-label">Horario de Inicio: </label>
              <TimePicker
                onChange={setStarttime}
                value={starttime}
                className="form-control"
                disableClock
              />
            </div>
            <div className="form-column">
              <label className="form-label">Horario Fin: </label>
              <TimePicker
                onChange={setEndtime}
                value={endtime}
                className="form-control"
                disableClock
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <label className="form-label">Límite de Estudiantes: </label>
              <input
                value={limitStudents}
                onChange={(e) => setLimitStudents(e.target.value)}
                type="number"
                className="form-control"
                min="1"
                step="1"
              />
            </div>
            <div className="form-column">
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

          <button type="submit" className="btn btn-primary">
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

export default CompEditSchedule;
