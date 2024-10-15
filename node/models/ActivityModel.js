const { db } = require("../database/firebase");

class Activity {
  constructor(idactivity, nameactivity, description, dateActivity, photo) {
    this.idactivity = idactivity;
    this.nameactivity = nameactivity;
    this.description = description;
    this.dateActivity = dateActivity;
    this.photo = photo;
  }

  static async getActivity() {
    try {
      const snapshot = await db.collection("activity").get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.log(error.message);
      throw new Error("Error obteniendo actividades: " + error.message);
    }
  }

  static async searchActivity(id) {
    try {
      const snapshot = await db
        .collection("activity")
        .where("idactivity", "==", id)
        .get();
      if (snapshot.empty) {
        return [];
      }
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error("Error buscando actividad: " + error.message);
    }
  }

  static async addActivity(data) {
    try {
      const snapshot = await db.collection("activity").get();
      const activities = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const maxIdActivity =
        activities.length > 0
          ? Math.max(
              ...activities.map((activity) => parseInt(activity.idactivity))
            )
          : 0;

      const newIdActivity = (maxIdActivity + 1).toString();

      const activityData = { ...data, idactivity: newIdActivity };

      const docRef = await db.collection("activity").add(activityData);
      return docRef.id;
    } catch (error) {
      throw new Error("Error creando actividad: " + error.message);
    }
  }

  static async updateActivity(id, data) {
    try {
      const activityref = db.collection("activity").doc(id);
      const activityDoc = await activityref.get();

      if (!activityDoc.exists) {
        throw new Error("actividad no encontrada");
      }

      await activityref.update(data);
      return { id, ...data };
    } catch (error) {
      throw new Error("Error actualizando actividad: " + error.message);
    }
  }

  static async deleteActivity(id) {
    try {
      const activityref = db.collection("activity").doc(id);
      const activityDoc = await activityref.get();

      if (!activityDoc.exists) {
        throw new Error("actividad no encontrado");
      }

      await activityref.delete();
      return { message: "actividad eliminada con éxito" };
    } catch (error) {
      throw new Error("Error eliminando actividad: " + error.message);
    }
  }
}

module.exports = Activity;
