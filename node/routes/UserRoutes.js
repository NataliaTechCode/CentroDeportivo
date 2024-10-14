const express = require("express");
const userController = require("../controllers/UserController");

const router = express.Router();

// Ruta para obtener todas los usuarios
router.get("/usuario", userController.getUser);

//Ruta para buscar usuario
router.get("/usuario/:id", userController.searchUser);

// Ruta para crear un usuario
router.post("/usuario", userController.addUser);

//Ruta para editar usuario
router.put("/usuario/:id", userController.updateUser);

// Ruta para eliminar un usuario
router.delete("/usuario/:id", userController.deleteUser);

module.exports = router;
