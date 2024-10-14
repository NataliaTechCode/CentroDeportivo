const express = require("express");
const studentController = require("../controllers/StudentController");

const router = express.Router();

// Ruta para obtener todas los Estudiantes
router.get("/estudiantes", studentController.getStudent);

//Ruta para buscar Estudiante
router.get("/estudiantes/:id", studentController.searchStudent);

// Ruta para crear un Estudiante
router.post("/estudiantes", studentController.addStudent);

//Ruta para editar Estudiante
router.put("/estudiantes/:id", studentController.updateStudent);

// Ruta para eliminar un Estudiante
router.delete("/estudiantes/:id", studentController.deleteStudent);

module.exports = router;
