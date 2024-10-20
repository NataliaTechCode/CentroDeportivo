const Activity = require("../models/ActivityModel");

const getActivity = async (req, res) => {
  try {
    const activities = await Activity.getActivity();
    res.status(200).send(activities);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener a los actividades" });
  }
};

const searchActivity = async (req, res) => {
  const id = req.params.id;
  try {
    const activity = await Activity.searchActivity(id);
    if (activity) {
      res.status(200).send(activity);
    } else {
      res.status(404).send({ message: "Actividad no encontrada" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addActivity = async (req, res) => {
  try {
    const { idactivity, nameactivity, description, dateActivity, photo } =
      req.body;
    const activityId = await Activity.addActivity({
      idactivity,
      nameactivity,
      description,
      dateActivity,
      photo,
    });
    res
      .status(200)
      .send({ id: activityId, message: "actividad creada exitosamente" });
  } catch (error) {
    res.status(500).send({ error: "Error al crear actividad" });
  }
};

/*Editar Estudiate */
const updateActivity = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const Activityupdate = await Activity.updateActivity(id, data);
    res.status(200).send(Activityupdate);
  } catch (error) {
    res.status(500).send({ error: "Error al editar actividad" });
  }
};

const deleteActivity = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Activity.deleteActivity(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getActivity,
  searchActivity,
  addActivity,
  updateActivity,
  deleteActivity,
};
