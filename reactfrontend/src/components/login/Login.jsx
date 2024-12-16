import React, { useState } from "react";
import { login } from "./authService";
import "../../styles/Login.css";
import user_icon from "../../assets/person.png";
import password_icon from "../../assets/password.png";

const LoginComponent = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("SAda");
      const response = await login(user, password);
      localStorage.setItem("token", response.token); // Guardar token en el localStorage
      console.log("sada");
      const hasToken = !!localStorage.getItem("token");
      alert("Inicio de sesión exitoso");
      setIsAuthenticated(true);
      console.log("Token recibido:", response.token);
      console.log(hasToken);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="containers">
      <form onSubmit={handleSubmit}>
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
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
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

export default LoginComponent;
