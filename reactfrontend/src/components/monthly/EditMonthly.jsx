import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { DatePicker, TimePicker } from "@material-ui/pickers";

const URI = "http://localhost:4000/api/mensualidad/";

const CompEditMonthly = () => {
  const [startdate, setStartdate] = useState(new Date());;
  const [enddate, setEnddate] = useState(new Date());;
  const [student, setStudent] = useState("");
  const [schedule, setSchedule] = useState("10:00");
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  //Procedimiento para actualizar
  const update = async (e) => {
    e.preventDefault();
    console.log(id);
    await axios.put(URI + id, {
      startdate: startdate,
      enddate: enddate,
      student: student,
      schedule: schedule,
      state: state,
    });
    navigate("/");
  };

  const getMonthlyByid = useCallback(async () => {
    const res = await axios.get(URI + id);
    setStartdate(res.data.startdate);
    setEnddate(res.data.enddate);
    setStudent(res.data.student);
    setSchedule(res.data.schedule);
    setState(res.data.state);
  }, [id]);

  useEffect(() => {
    getMonthlyByid();
  }, [getMonthlyByid]);

  return (
    <Container>
      <div>
        <h1>Editar Mensualidad</h1>
        <form onSubmit={update}>
          <div className="input-container">
            <div className="mb-3">
              <label className="form-label">Fecha de inicio: </label>
              <DatePicker
                value={startdate}
                onChange={(date) => setStartdate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </div>

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

          <div className="input-container">
            <div className="mb-3">
              <label className="form-label">Estudiante: </label>
              <input
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Horario: </label>
              <TimePicker
                onChange={setSchedule}
                value={schedule}
                className="form-control"
                disableClock={true}
              />
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

export default CompEditMonthly;
