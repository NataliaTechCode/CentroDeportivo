const express = require("express");
const scheduleController = require("../controllers/ScheduleController");

const router = express.Router();

// Ruta para obtener todas los Horario
router.get("/horario", scheduleController.getSchedule);

//Ruta para buscar horario
router.get("/horario/:id", scheduleController.searchSchedule);

// Ruta para crear un horario
router.post("/horario", scheduleController.addSchedule);

//Ruta para editar horario
router.put("/horario/:id", scheduleController.updateSchedule);

// Ruta para eliminar un horario
router.delete("/horario/:id", scheduleController.deleteSchedule);

module.exports = router;
