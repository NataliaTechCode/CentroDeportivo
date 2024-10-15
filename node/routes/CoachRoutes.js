const express = require("express");
const coachController = require("../controllers/CoachController");

const router = express.Router();

// Ruta para obtener todas los entrenadores
router.get("/entrenador", coachController.getCoach);

//Ruta para buscar entrenador
router.get("/entrenador/:id", coachController.searchCoach);

// Ruta para crear un entrenador
router.post("/entrenador", coachController.addCoach);

//Ruta para editar entrenador
router.put("/entrenador/:id", coachController.updateCoach);

// Ruta para eliminar un entrenador
router.delete("/entrenador/:id", coachController.deleteCoach);

module.exports = router;
