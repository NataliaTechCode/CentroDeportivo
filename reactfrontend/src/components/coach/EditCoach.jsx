import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const URI = "http://localhost:4000/api/entrenador/";

const CompEditCoach = () => {
  const [namecoach, setNamecoach] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  //Procedimiento para actualizar
  const update = async (e) => {
    e.preventDefault();
    console.log(id);
    await axios.put(URI + id, {
      namecoach: namecoach,
      phone: phone,
    });
    navigate("/");
  };

  const getCoachByid = useCallback(async () => {
    const res = await axios.get(URI + id);
    setNamecoach(res.data.name);
    setPhone(res.data.coachname);
  }, [id]);

  useEffect(() => {
    getCoachByid();
  }, [getCoachByid]);

  return (
    <Container>
      <div>
        <h1>Editar entrenador</h1>
        <form onSubmit={update}>
          <div className="mb-3">
            <label className="form-label">Nombre: </label>
            <input
              value={namecoach}
              onChange={(e) => setNamecoach(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">entrenador: </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

export default CompEditCoach;
