const { db } = require("../database/firebase");

class User {
  constructor(iduser, name, username, password, email, role, permissions,createdAt) {
    this.iduser = iduser;
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
    this.permissions = permissions;
    this.createdAt = createdAt;
  }

  static async getUser() {
    try {
      const snapshot = await db.collection("user").get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error("Error obteniendo Usuarios: " + error.message);
    }
  }

  static async searchUser(id) {
    try {
      const snapshot = await db
        .collection("user")
        .where("iduser", "==", id)
        .get();
      if (snapshot.empty) {
        return []; 
      }
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error("Error buscando Usuario: " + error.message);
    }
  }

  static async addUser(data) {
    try {
      const snapshot = await db.collection("user").get();
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const maxIdUser =
        users.length > 0
          ? Math.max(...users.map((user) => parseInt(user.iduser)))
          : 0;

      const newIdUser = (maxIdUser + 1).toString();

      const userData = { ...data, iduser: newIdUser };

      const docRef = await db.collection("user").add(userData);
      return docRef.id;
    } catch (error) {
      throw new Error("Error creando usuario: " + error.message);
    }
  }

  static async updateUser(id, data) {
    try {
      const userref = db.collection("user").doc(id);
      const userDoc = await userref.get();

      if (!userDoc.exists) {
        throw new Error("usuario no encontrado");
      }

      await userref.update(data);
      return { id, ...data };
    } catch (error) {
      throw new Error("Error actualizando usuario: " + error.message);
    }
  }

  static async deleteUser(id) {
    try {
      const userref = db.collection("user").doc(id);
      const userDoc = await userref.get();

      if (!userDoc.exists) {
        throw new Error("usuario no encontrado");
      }

      await userref.delete(); 
      return { message: "usuario eliminado con éxito" };

    } catch (error) {
      throw new Error("Error eliminando usuario: " + error.message);
    }
  }
}

module.exports = User;
