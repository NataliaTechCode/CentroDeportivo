const Student = require("../models/StudentModel");

const getStudent = async (req, res) => {
  try {
    const Students = await Student.getStudent();
    res.status(200).send(Students);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener a los Estudiantes" });
  }
};

const searchStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.searchStudent(id);
    if (student.length > 0) {
      res.status(200).send(student);
    } else {
      res.status(404).send({ message: "Estudiante no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addStudent = async (req, res) => {
  try {
    const { idstudent, name, lastname, ci, birth, phone, photostudent } =
      req.body;
    const studentId = await Student.addStudent({
      idstudent,
      name,
      lastname,
      ci,
      birth,
      phone,
      photostudent,
    });
    res
      .status(200)
      .send({ id: studentId, message: "Estudiante creada exitosamente" });
  } catch (error) {
    res.status(500).send({ error: "Error al crear Estudiante" });
  }
};

/*Editar Estudiate */
const updateStudent = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const Studentupdate = await Student.updateStudent(id,data);
    res.status(200).send(Studentupdate);
  } catch (error) {
    res.status(500).send({ error: "Error al editar Estudiante" });
  }
};

const deleteStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Student.deleteStudent(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getStudent,
  searchStudent,
  addStudent,
  updateStudent,
  deleteStudent
};
