import axios from "axios";

const URL = "http://localhost:4000/api/login";

export const login = async (username, password) => {
  try {
    const response = await axios.post(URL, { username, password });
    return response.data; // { message: "Inicio de sesión exitoso", token }
  } catch (error) {
    console.error("Error al iniciar sesión:", error.response.data);
    throw new Error(
      error.response.data.message || "Error en el inicio de sesión"
    );
  }
};
