const express = require("express");
const monthlyController = require("../controllers/MonthlyController");

const router = express.Router();

// Ruta para obtener todas las Mensualidades
router.get("/mensualidad", monthlyController.getMonthly);

//Ruta para buscar mensualidad
router.get("/mensualidad/:id", monthlyController.searchMonthly);

// Ruta para crear un mensualidad
router.post("/mensualidad", monthlyController.addMonthly);

//Ruta para editar mensualidad
router.put("/mensualidad/:id", monthlyController.updateMonthly);

// Ruta para eliminar un mensualidad
router.delete("/mensualidad/:id", monthlyController.deleteMonthly);

module.exports = router;
