import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DatePicker } from "@material-ui/pickers";

const URI = "http://localhost:4000/api/actividad";

const CompCreateActivity = () => {
  const [nameactivity, setNameactivity] = useState("");
  const [description, setDescription] = useState("");
  const [dateActivity, setDateActivity] = useState(new Date());
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  //Procedimiento guardar
  const Store = async (e) => {
    e.preventDefault();
    await axios.post(URI, {
      nameactivity: nameactivity,
      description: description,
      dateActivity: dateActivity,
      photo: photo,
    });
    navigate("/");
  };

  return (
    <Container>
      <div>
        <h1>Añadir Actividad</h1>
        <form onSubmit={Store}>
          <div className="input-container">
            <div className="mb-3">
              <label className="form-label">Nombre de la actividad: </label>
              <input
                value={nameactivity}
                onChange={(e) => setNameactivity(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción: </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
          </div>

          <div className="input-container">
            <div className="mb-3">
              <label className="form-label">Fecha: </label>
              <DatePicker
                value={dateActivity}
                onChange={(date) => setDateActivity(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Foto: </label>
            <input
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
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

export default CompCreateActivity;
