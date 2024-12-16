import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DatePicker } from "@material-ui/pickers";

const URI = "http://localhost:4000/api/estudiante";

const CompCreateStudent = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [ci, setCi] = useState("");
  const [birth, setBirth] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [photostudent, setPhotostudent] = useState("");
  const navigate = useNavigate();

  //Procedimiento guardar
  const Store = async (e) => {
    e.preventDefault();
    await axios.post(URI, {
      name: name,
      lastname: lastname,
      ci: ci,
      birth: birth,
      phone: phone,
      photostudent: photostudent,
    });
    navigate("/student");
  };

  return (
    <Container>
      <div>
        <h1>Añadir Estudiante</h1>
        <form onSubmit={Store}>
          <div class="form-row">
            <div class="form-column">
              <div className="mb-3">
                <label className="form-label">Nombre: </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div class="form-column">
              <div className="mb-3">
                <label className="form-label">Apellido: </label>
                <input
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-column">
              <div className="mb-3">
                <label className="form-label">CI: </label>
                <input
                  value={ci}
                  onChange={(e) => setCi(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div class="form-column">
              <div className="mb-3">
                <label className="form-label">Teléfono: </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div class="form-field">
            <div className="mb-3">
              <label className="form-label">Fecha de nacimiento: </label>
              <DatePicker
                value={birth}
                onChange={(date) => setBirth(date)}
                dateFormat="dd/MM/yyyy" // Formato de la fecha
                className="form-control"
              />
            </div>
          </div>

          {/* <div class="form-field">
            <div className="mb-3">
              <label className="form-label">Foto del Estudiante: </label>
              <input
                value={photostudent}
                onChange={(e) => setPhotostudent(e.target.value)}
                type="file"
                className="form-control"
              />
            </div>
          </div> */}

          {/* <div class="form-field">
            <div className="mb-3">
              <label className="form-label">Foto del Estudiante: </label>
              <input
                value={photostudent}
                onChange={(e) => setPhotostudent(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
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

export default CompCreateStudent;
