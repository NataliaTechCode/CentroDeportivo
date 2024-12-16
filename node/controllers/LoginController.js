const User = require("../models/LoginModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Usuario y contraseña son requeridos" });
    }

    const foundUser = await User.findByUsername(username);
    if (!foundUser) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Contraseña incorrecta" });
    }

    //Añir rol y permisos
    const token = jwt.sign(
      { userId: foundUser.iduser, username: foundUser.username },
      "tu_secreto_secreto",
      { expiresIn: "1h" }
    );

    return res.status(200).send({
      iduser: foundUser.iduser,
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res
      .status(500)
      .send({ error: "Error al procesar el inicio de sesión" });
  }
};

module.exports = { login };
