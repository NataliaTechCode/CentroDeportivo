const Sport = require("../models/SportModel");

const getSport = async (req, res) => {
  try {
    const Sports = await Sport.getSport();
    res.status(200).send(Sports);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener a los deportes" });
  }
};

const searchSport = async (req, res) => {
  const id = req.params.id;
  try {
    const sport = await Sport.searchSport(id);
    if (sport) {
      res.status(200).send(sport);
    } else {
      res.status(404).send({ message: "Horario no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


const addSport = async (req, res) => {
  try {
    const { idsport, namesport } = req.body;
    const sportId = await Sport.addSport({
      idsport,
      namesport,
    });
    res
      .status(200)
      .send({ id: sportId, message: "deporte creado exitosamente" });
  } catch (error) {
    res.status(500).send({ error: "Error al crear deporte" });
  }
};

/*Editar Estudiate */
const updateSport = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const Sportupdate = await Sport.updateSport(id, data);
    res.status(200).send(Sportupdate);
  } catch (error) {
    res.status(500).send({ error: "Error al editar deporte" });
  }
};

const deleteSport = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Sport.deleteSport(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getSport,
  searchSport,
  addSport,
  updateSport,
  deleteSport,
};
