import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const URI = "http://localhost:4000/api/usuario/";

const CompEditUser = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  // const [permissions, setPermissions] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  //Procedimiento para actualizar
  const update = async (e) => {
    e.preventDefault();
    console.log(id);
    await axios.put(URI + id, {
      name: name,
      username: username,
      password: password,
      email: email,
      role: role,
      // permissions: permissions,
    });
    navigate("/user");
  };

  const getUserByid = useCallback(async () => {
    const res = await axios.get(URI + id);
    setName(res.data.name);
    setUsername(res.data.username);
    setPassword(res.data.password);
    setEmail(res.data.email);
    setRole(res.data.role);
    // setPermissions(res.data.permissions);
  }, [id]);

  useEffect(() => {
    getUserByid();
  }, [getUserByid]);

  return (
    <Container>
      <div>
        <h1>Editar usuario</h1>
        <form onSubmit={update}>
          <div className="mb-3">
            <label className="form-label">Nombre: </label>
            <input
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>

          <div className="input-container">
            <div className="mb-3">
              <label className="form-label">Usuario: </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña: </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" // Cambiado a 'password'
                className="form-control"
              />
            </div>
          </div>

          <div className="input-container">
            <div className="mb-3">
              <label className="form-label">Email: </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label"> Rol: </label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
          </div>
          {/* <div className="mb-3">
          <label className="form-label">Permisos: </label>
          <input
          value={permissions}
            onChange={(e) => setPermissions(e.target.value)}
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

export default CompEditUser;
