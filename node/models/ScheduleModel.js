const { db } = require("../database/firebase");

class Schedule {
  constructor(
    idschedule,
    starttime,
    endtime,
    dayWeek,
    limitStudents,
    totalstudents,
    coach,
    sport
  ) {
    this.idschedule = idschedule;
    this.starttime = starttime;
    this.endtime = endtime;
    this.dayWeek = dayWeek;
    this.limitStudents = limitStudents;
    this.totalstudents = totalstudents;
    this.coach = coach;
    this.sport = sport;
  }

  static async getSchedule() {
    try {
      // Llamar a updateTotalStudents antes de obtener los horarios
      // await this.updateTotalStudents();

      const snapshot = await db.collection("schedule").get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.log(error.message);
      throw new Error("Error obteniendo horarios: " + error.message);
    }
  }

  static async searchSchedule(id) {
    try {
      const scheduleRef = db.collection("schedule").doc(id); // Obtiene la referencia al documento del estudiante
      const scheduleDoc = await scheduleRef.get(); // Obtiene el documento
      // console.log(Object.keys(schedule).length);

      if (!scheduleDoc.exists) {
        throw new Error("Estudiante no encontrado");
      }

      return { id: scheduleDoc.id, ...scheduleDoc.data() }; // Retorna el ID y los datos del estudiante
    } catch (error) {
      throw new Error("Error obteniendo estudiante: " + error.message);
    }
  }

  static async addSchedule(data) {
    try {
      const snapshot = await db.collection("schedule").get();
      const schedules = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const maxIdSchedule =
        schedules.length > 0
          ? Math.max(
              ...schedules.map((schedule) => parseInt(schedule.idschedule))
            )
          : 0;

      const newIdSchedule = (maxIdSchedule + 1).toString();

      const scheduleData = { ...data, idschedule: newIdSchedule };

      const docRef = await db.collection("schedule").add(scheduleData);
      return docRef.id;
    } catch (error) {
      throw new Error("Error creando horario: " + error.message);
    }
  }

  static async updateSchedule(id, data) {
    try {
      const scheduleref = db.collection("schedule").doc(id);
      const scheduleDoc = await scheduleref.get();

      if (!scheduleDoc.exists) {
        throw new Error("horario no encontrado");
      }

      await scheduleref.update(data);
      return { id, ...data };
    } catch (error) {
      throw new Error("Error actualizando horario: " + error.message);
    }
  }

  static async deleteSchedule(id) {
    try {
      const scheduleref = db.collection("schedule").doc(id);
      const scheduleDoc = await scheduleref.get();

      if (!scheduleDoc.exists) {
        throw new Error("horario no encontrado");
      }

      await scheduleref.delete();
      return { message: "horario eliminado con éxito" };
    } catch (error) {
      throw new Error("Error eliminando horario: " + error.message);
    }
  }

  static async updateTotalStudents() {
    try {
      // Obtener la colección de schedule
      const scheduleSnapshot = await db.collection("schedule").get();
      const scheduleDocs = scheduleSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Obtener la colección de monthly
      const monthlySnapshot = await db.collection("monthly").get();
      const monthlyDocs = monthlySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Obtener la fecha actual
      const currentDate = new Date();

      // Iterar sobre cada documento en la colección schedule
      for (const schedule of scheduleDocs) {
        const { sport, starttime, endtime } = schedule;

        // Filtrar estudiantes en la tabla monthly
        const filteredStudents = monthlyDocs.filter((monthly) => {
          const monthlyEndDate = new Date(monthly.enddate);
          const scheduleTime = monthly.schedule; // Horario almacenado

          // Condiciones de filtrado:
          // 1. Coincidencia de deporte (sport)
          // 2. Horario coincida exactamente con el starttime y endtime
          // 3. El enddate sea al menos un día antes de la fecha actual
          return (
            monthly.sport === sport &&
            scheduleTime.includes(starttime) &&
            scheduleTime.includes(endtime) &&
            monthlyEndDate < currentDate
          );
        });

        // Contar cuántos estudiantes cumplen las condiciones
        const totalStudents = filteredStudents.length;

        // Actualizar el atributo totalstudents en la tabla schedule
        await db.collection("schedule").doc(schedule.id).update({
          totalstudents: totalStudents,
        });
      }

      console.log(
        "Total de estudiantes actualizado correctamente en schedule."
      );
    } catch (error) {
      console.error("Error actualizando totalstudents:", error.message);
      throw new Error("Error actualizando totalstudents: " + error.message);
    }
  }
}

module.exports = Schedule;
