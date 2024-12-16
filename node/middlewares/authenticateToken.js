const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ message: "Acceso denegado: Token no proporcionado" });

  jwt.verify(token, "tu_secreto_secreto", (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
