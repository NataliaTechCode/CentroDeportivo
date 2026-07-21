const express = require("express");
const sportController = require("../controllers/SportController");

const router = express.Router();

// Ruta para obtener todas los deportes
router.get("/deporte", sportController.getSport);

//Ruta para buscar deporte
router.get("/deporte/:id", sportController.searchSport);

// Ruta para crear un deporte
router.post("/deporte", sportController.addSport);

//Ruta para editar deporte
router.put("/deporte/:id", sportController.updateSport);

// Ruta para eliminar un deporte
router.delete("/deporte/:id", sportController.deleteSport);

module.exports = router;
