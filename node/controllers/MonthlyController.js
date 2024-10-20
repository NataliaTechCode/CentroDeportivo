const Monthly = require("../models/MonthlyModel");

const getMonthly = async (req, res) => {
  try {
    const Monthlies = await Monthly.getMonthly();
    res.status(200).send(Monthlies);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener a los mensualidades" });
  }
};

const searchMonthly = async (req, res) => {
  const id = req.params.id;
  try {
    const monthly = await Monthly.searchMonthly(id);
    if (monthly) {
      res.status(200).send(monthly);
    } else {
      res.status(404).send({ message: "Mensualidad no encontrada" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addMonthly = async (req, res) => {
    try {
    const { idmonthly, startdate, enddate, student, schedule, state } = req.body;
    const monthlyId = await Monthly.addMonthly({
      idmonthly,
      startdate,
      enddate,
      student,
      schedule,
      state
    });
    res
      .status(200)
      .send({ id: monthlyId, message: "mensualidad creada exitosamente" });
  } catch (error) {
    res.status(500).send({ error: "Error al crear mensualidad" });
  }
};

/*Editar Estudiate */
const updateMonthly = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const Monthlyupdate = await Monthly.updateMonthly(id, data);
    res.status(200).send(Monthlyupdate);
  } catch (error) {
    res.status(500).send({ error: "Error al editar mensualidad" });
  }
};

const deleteMonthly = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Monthly.deleteMonthly(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getMonthly,
  searchMonthly,
  addMonthly,
  updateMonthly,
  deleteMonthly,
};
