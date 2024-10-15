const { db } = require("../database/firebase");

class Coach {
  constructor(idcoach, namecoach, phone) {
    this.idcoach = idcoach;
    this.namecoach = namecoach;
    this.phone = phone;
  }

  static async getCoach() {
    try {
      const snapshot = await db.collection("coach").get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.log(error.message)
      throw new Error("Error obteniendo entrenadoress: " + error.message);
    }
  }

  static async searchCoach(id) {
    try {
      const snapshot = await db
        .collection("coach")
        .where("idcoach", "==", id)
        .get();
      if (snapshot.empty) {
        return [];
      }
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error("Error buscando entrenador: " + error.message);
    }
  }

  static async addCoach(data) {
    try {
      const snapshot = await db.collection("coach").get();
      const coachs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const maxIdCoach =
        coachs.length > 0
          ? Math.max(...coachs.map((coach) => parseInt(coach.idcoach)))
          : 0;

      const newIdCoach = (maxIdCoach + 1).toString();

      const coachData = { ...data, idcoach: newIdCoach };

      const docRef = await db.collection("coach").add(coachData);
      return docRef.id;
    } catch (error) {
      throw new Error("Error creando entrenador: " + error.message);
    }
  }

  static async updateCoach(id, data) {
    try {
      const coachref = db.collection("coach").doc(id);
      const coachDoc = await coachref.get();

      if (!coachDoc.exists) {
        throw new Error("entrenador no encontrado");
      }

      await coachref.update(data);
      return { id, ...data };
    } catch (error) {
      throw new Error("Error actualizando entrenador: " + error.message);
    }
  }

  static async deleteCoach(id) {
    try {
      const coachref = db.collection("coach").doc(id);
      const coachDoc = await coachref.get();

      if (!coachDoc.exists) {
        throw new Error("entrenador no encontrado");
      }

      await coachref.delete();
      return { message: "entrenador eliminado con éxito" };
    } catch (error) {
      throw new Error("Error eliminando entrenador: " + error.message);
    }
  }
}

module.exports = Coach;
