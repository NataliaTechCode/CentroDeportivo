const { db } = require("../database/firebase");

class Monthly {
  constructor(idmonthly, startdate, enddate, student, schedule, state) {
    this.idmonthly = idmonthly;
    this.startdate = startdate;
    this.enddate = enddate;
    this.student = student;
    this.schedule = schedule;
    this.state = state;
  }

  static async getMonthly() {
    try {
      const snapshot = await db.collection("monthly").get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.log(error.message);
      throw new Error("Error obteniendo mensualidades: " + error.message);
    }
  }

  static async searchMonthly(id) {
    try {
      const snapshot = await db
        .collection("monthly")
        .where("idmonthly", "==", id)
        .get();
      if (snapshot.empty) {
        return [];
      }
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error("Error buscando mensualidad: " + error.message);
    }
  }

  static async addMonthly(data) {
    try {
      const snapshot = await db.collection("monthly").get();
      const Monthlies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const maxIdMonthly =
      Monthlies.length > 0
          ? Math.max(
              ...Monthlies.map((monthly) => parseInt(monthly.idmonthly))
            )
          : 0;

      const newIdMonthly = (maxIdMonthly + 1).toString();

      const monthlyData = { ...data, idmonthly: newIdMonthly };

      const docRef = await db.collection("monthly").add(monthlyData);
      return docRef.id;
    } catch (error) {
      throw new Error("Error creando mensualidad: " + error.message);
    }
  }

  static async updateMonthly(id, data) {
    try {
      const monthlyref = db.collection("monthly").doc(id);
      const monthlyDoc = await monthlyref.get();

      if (!monthlyDoc.exists) {
        throw new Error("mensualidad no encontrada");
      }

      await monthlyref.update(data);
      return { id, ...data };
    } catch (error) {
      throw new Error("Error actualizando mensualidad: " + error.message);
    }
  }

  static async deleteMonthly(id) {
    try {
      const monthlyref = db.collection("monthly").doc(id);
      const monthlyDoc = await monthlyref.get();

      if (!monthlyDoc.exists) {
        throw new Error("mensualidad no encontrado");
      }

      await monthlyref.delete();
      return { message: "mensualidad eliminada con éxito" };
    } catch (error) {
      throw new Error("Error eliminando mensualidad: " + error.message);
    }
  }
}

module.exports = Monthly;
