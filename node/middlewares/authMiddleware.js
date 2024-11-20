// src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Valida el token
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido." });
  }
};

module.exports = authMiddleware;
