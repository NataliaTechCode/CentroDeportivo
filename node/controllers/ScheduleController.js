const Schedule = require("../models/ScheduleModel");

const getSchedule = async (req, res) => {
  try {
    const Schedules = await Schedule.getSchedule();
    res.status(200).send(Schedules);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener a los horarios" });
  }
};

const searchSchedule = async (req, res) => {
  const id = req.params.id;
  try {
    const schedule = await Schedule.searchSchedule(id);
    if (schedule) {
      res.status(200).send(schedule);
    } else {
      res.status(404).send({ message: "Horario no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addSchedule = async (req, res) => {
    try {
    const { idschedule, starttime, endtime, dayWeek, limitStudents, totalstudents, coach, sport } = req.body;
    const scheduleId = await Schedule.addSchedule({
      idschedule,
      starttime,
      endtime,
      dayWeek,
      limitStudents,
      totalstudents,
      coach,
      sport
    });
    res
      .status(200)
      .send({ id: scheduleId, message: "horario creado exitosamente" });
  } catch (error) {
    res.status(500).send({ error: "Error al crear horario" });
  }
};

/*Editar Estudiate */
const updateSchedule = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const Scheduleupdate = await Schedule.updateSchedule(id, data);
    res.status(200).send(Scheduleupdate);
  } catch (error) {
    res.status(500).send({ error: "Error al editar horario" });
  }
};

const deleteSchedule = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Schedule.deleteSchedule(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getSchedule,
  searchSchedule,
  addSchedule,
  updateSchedule,
  deleteSchedule,
};
