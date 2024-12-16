import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { DatePicker } from "@material-ui/pickers";

const URI = "http://localhost:4000/api/actividad/";

const CompEditActivity = () => {
  const [nameactivity, setNameactivity] = useState("");
  const [description, setDescription] = useState("");
  const [dateActivity, setDateActivity] = useState(new Date());
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  //Procedimiento para actualizar
  const update = async (e) => {
    e.preventDefault();
    console.log(id);
    await axios.put(URI + id, {
      nameactivity: nameactivity,
      description: description,
      dateActivity: dateActivity,
      photo: photo,
    });
    navigate("/activity");
  };

  const getActivityByid = useCallback(async () => {
    const res = await axios.get(URI + id);
    setNameactivity(res.data.nameactivity);
    setDescription(res.data.description);
    setDateActivity(res.data.dateActivity);
    setPhoto(res.data.photo);
  }, [id]);

  useEffect(() => {
    getActivityByid();
  }, [getActivityByid]);

  return (
    <Container>
      <div>
        <h1>Editar Aviso</h1>
        <form onSubmit={update}>
          <div className="form-field">
            <div className="mb-3">
              <label className="form-label">Nombre del aviso: </label>
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
                rows="2"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha: </label>
            <DatePicker
              value={dateActivity}
              onChange={(date) => setDateActivity(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control"
            />
          </div>

          {/* <div className="mb-3">
            <label className="form-label">Foto: </label>
            <input
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              type="text"
              className="form-control"
            />
          </div> */}

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

export default CompEditActivity;
