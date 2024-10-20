const User = require("../models/UserModel");

const getUser = async (req, res) => {
  try {
    const Users = await User.getUser();
    res.status(200).send(Users);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener a los usuarios" });
  }
};

const searchUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.searchUser(id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "Estudiante no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


const addUser = async (req, res) => {
  try {
    const { iduser, name, username, password, email, role, permissions,createdAt } =
      req.body;
    const userId = await User.addUser({
      iduser,
      name,
      username,
      password,
      role,
      permissions,
      createdAt,
    });
    res
      .status(200)
      .send({ id: userId, message: "usuario creado exitosamente" });
  } catch (error) {
    res.status(500).send({ error: "Error al crear usuario" });
  }
};

/*Editar Estudiate */
const updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const Userupdate = await User.updateUser(id,data);
    res.status(200).send(Userupdate);
  } catch (error) {
    res.status(500).send({ error: "Error al editar usuario" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.deleteUser(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getUser,
  searchUser,
  addUser,
  updateUser,
  deleteUser
};
