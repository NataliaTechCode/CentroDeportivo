const Coach = require("../models/CoachModel");

const getCoach = async (req, res) => {
  try {
    const Coaches = await Coach.getCoach();
    res.status(200).send(Coaches);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener a los entrenadores" });
  }
};

const searchCoach = async (req, res) => {
  const id = req.params.id;
  try {
    const coach = await Coach.searchCoach(id);
    if (coach.length > 0) {
      res.status(200).send(coach);
    } else {
      res.status(404).send({ message: "entrenador no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addCoach = async (req, res) => {
  try {
    const { idcoach, namecoach,phone } = req.body;
    const coachId = await Coach.addCoach({
      idcoach,
      namecoach,
      phone
    });
    res
      .status(200)
      .send({ id: coachId, message: "entrenador creado exitosamente" });
  } catch (error) {
    res.status(500).send({ error: "Error al crear entrenador" });
  }
};

/*Editar Estudiate */
const updateCoach = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const Coachupdate = await Coach.updateCoach(id, data);
    res.status(200).send(Coachupdate);
  } catch (error) {
    res.status(500).send({ error: "Error al editar entrenador" });
  }
};

const deleteCoach = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Coach.deleteCoach(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getCoach,
  searchCoach,
  addCoach,
  updateCoach,
  deleteCoach,
};
