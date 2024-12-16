const express = require("express");
const activityController = require("../controllers/ActivityController");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

// Ruta para obtener todas las actividades
router.get("/actividad", authenticateToken, activityController.getActivity);

//Ruta para buscar actividad
router.get("/actividad/:id", activityController.searchActivity);

// Ruta para crear un actividad
router.post("/actividad", activityController.addActivity);

//Ruta para editar actividad
router.put("/actividad/:id", activityController.updateActivity);

// Ruta para eliminar un actividad
router.delete("/actividad/:id", activityController.deleteActivity);

module.exports = router;
