const express = require("express");
const studentController = require("../controllers/StudentController");
const authMiddleware  = require("../middlewares/authMiddleware")

const router = express.Router();

// Ruta para obtener todas los Estudiantes
router.get("/estudiante", studentController.getStudent);

//Ruta para buscar Estudiante
router.get("/estudiante/:id", studentController.searchStudent);

// Ruta para crear un Estudiante
router.post("/estudiante", studentController.addStudent);

//Ruta para editar Estudiante
router.put("/estudiante/:id", studentController.updateStudent);

// Ruta para eliminar un Estudiante
router.delete("/estudiante/:id", studentController.deleteStudent);

module.exports = router;
