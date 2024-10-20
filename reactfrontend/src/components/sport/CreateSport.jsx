import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const URI = "http://localhost:4000/api/deporte";

const CompCreateSport = () => {
  const [namesport, setNameSport] = useState("");
  const navigate = useNavigate();

  //Procedimiento guardar
  const Store = async (e) => {
    e.preventDefault();
    await axios.post(URI, {
      namesport: namesport,
    });
    navigate("/");
  };

  return (
    <Container>
      <div>
        <h1>Añadir Deporte</h1>
        <form onSubmit={Store}>
          <div className="mb-3">
            <label className="form-label">Deporte: </label>
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

export default CompCreateSport;
