import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import user_icon from "../../assets/person.png";
import password_icon from "../../assets/password.png";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/usuario");
      const users = await response.json();

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        setIsAuthenticated(true); // Llama a la función pasada por props
        navigate("/sports");
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Hubo un problema al conectarse con el servidor.");
    }
  };

  return (
    <div className="containers">
      <form onSubmit={handleLogin}>
        <div className="headers">
          <div className="texts">Iniciar Sesión</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="texts"
              id="username"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input">
            <img src={password_icon} />
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="warning" style={{ color: "red" }}>
              {error}
            </p>
          )}
        </div>
        <div className="submit-container">
          <button className="submit" type="submit">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
