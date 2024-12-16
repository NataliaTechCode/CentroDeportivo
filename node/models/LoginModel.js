const { db } = require("../database/firebase");

class User {
  constructor(username, password) {
    (this.username = username), (this.password = password);
  }

  static async findByUsername(username) {
    const usersRef = db.collection("user");
    const querySnapshot = await usersRef.where("username", "==", username).get();
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return { iduser: userDoc.iduser, ...userDoc.data() };
    }
    return null;
  }

  static async getUser() {}

  static async addUser(data) {
    try {
      console.log(data);
      const snapshot = await db.collection("user").get();
      const users = snapshot.docs.map((doc) => ({
        iduser: doc.iduser,
        ...doc.data(),
      }));

      const maxIdUser =
        users.length > 0
          ? Math.max(...users.map((user) => parseInt(user.iduser)))
          : 0;

      const newIdUser = (maxIdUser + 1).toString();

      const userData = { ...data, iduser: newIdUser };

      const docRef = await db.collection("user").add(userData);
      return docRef.iduser;
    } catch (error) {
      throw new Error("Error creando usuario: " + error.message);
    }
  }
}

module.exports = User;
