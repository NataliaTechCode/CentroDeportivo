import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const URI = "http://localhost:4000/api/deporte/";

const CompEditSport = () => {
  const [namesport, setNameSport] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  //Procedimiento para actualizar
  const update = async (e) => {
    e.preventDefault();
    console.log(id);
    await axios.put(URI + id, {
      namesport: namesport,
    });
    navigate("/sports");
  };

  const getSportByid = useCallback(async () => {
    const res = await axios.get(URI + id);
    setNameSport(res.data.namesport);
  }, [id]);

  useEffect(() => {
    getSportByid();
  }, [getSportByid]);

  return (
    <Container>
      <div>
        <h1>Editar Estudiante</h1>
        <form onSubmit={update}>
          <div className="mb-3">
            <label className="form-label">Nombre: </label>
            <input
              value={namesport}
              onChange={(e) => setNameSport(e.target.value)}
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

export default CompEditSport;
