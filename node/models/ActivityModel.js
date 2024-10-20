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
      const activityRef = db.collection("activity").doc(id); // Obtiene la referencia al documento del Actividad
      const activityDoc = await activityRef.get(); // Obtiene el documento
      // console.log(Object.keys(activity).length);

      if (!activityDoc.exists) {
        throw new Error("Actividad no encontrado");
      }

      return { id: activityDoc.id, ...activityDoc.data() }; // Retorna el ID y los datos del Actividad
    } catch (error) {
      throw new Error("Error obteniendo Actividad: " + error.message);
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
