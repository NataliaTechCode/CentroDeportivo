const { db } = require("../database/firebase");

class Sport {
  constructor(idsport, namesport) {
    this.idsport = idsport;
    this.namesport = namesport;
  }

  static async getSport() {
    try {
      const snapshot = await db.collection("sport").get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.log(error.message)
      throw new Error("Error obteniendo Deportes: " + error.message);
    }
  }

  static async searchSport(id) {
    try {
      const sportRef = db.collection("sport").doc(id); // Obtiene la referencia al documento del estudiante
      const sportDoc = await sportRef.get(); // Obtiene el documento
      // console.log(Object.keys(sport).length);

      if (!sportDoc.exists) {
        throw new Error("Estudiante no encontrado");
      }

      return { id: sportDoc.id, ...sportDoc.data() }; // Retorna el ID y los datos del estudiante
    } catch (error) {
      throw new Error("Error obteniendo estudiante: " + error.message);
    }
  }


  static async addSport(data) {
    try {
      const snapshot = await db.collection("sport").get();
      const sports = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const maxIdSport =
        sports.length > 0
          ? Math.max(...sports.map((sport) => parseInt(sport.idsport)))
          : 0;

      const newIdSport = (maxIdSport + 1).toString();

      const sportData = { ...data, idsport: newIdSport };

      const docRef = await db.collection("sport").add(sportData);
      return docRef.id;
    } catch (error) {
      throw new Error("Error creando deporte: " + error.message);
    }
  }

  static async updateSport(id, data) {
    try {
      const sportref = db.collection("sport").doc(id);
      const sportDoc = await sportref.get();

      if (!sportDoc.exists) {
        throw new Error("deporte no encontrado");
      }

      await sportref.update(data);
      return { id, ...data };
    } catch (error) {
      throw new Error("Error actualizando deporte: " + error.message);
    }
  }

  static async deleteSport(id) {
    try {
      const sportref = db.collection("sport").doc(id);
      const sportDoc = await sportref.get();

      if (!sportDoc.exists) {
        throw new Error("deporte no encontrado");
      }

      await sportref.delete();
      return { message: "deporte eliminado con éxito" };
    } catch (error) {
      throw new Error("Error eliminando deporte: " + error.message);
    }
  }
}

module.exports = Sport;
