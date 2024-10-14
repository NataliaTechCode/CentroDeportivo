const { db } = require("../database/firebase");

class Student {
  constructor(idstudent, name, lastname, ci, birth, phone, photostudent) {
    this.idstudent = idstudent;
    this.name = name;
    this.lastname = lastname;
    this.ci = ci;
    this.birth = birth;
    this.phone = phone;
    this.photostudent = photostudent;
  }

  static async getStudent() {
    try {
      const snapshot = await db.collection("student").get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error("Error obteniendo estudiantes: " + error.message);
    }
  }

  static async searchStudent(id) {
    try {
      const snapshot = await db
        .collection("student")
        .where("idstudent", "==", id)
        .get();
      if (snapshot.empty) {
        return []; // Retorna un arreglo vacío si no hay coincidencias
      }
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error("Error buscando estudiante: " + error.message);
    }
  }

  static async addStudent(data) {
    try {
      const snapshot = await db.collection("student").get();
      const students = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const maxIdStudent =
        students.length > 0
          ? Math.max(...students.map((student) => parseInt(student.idstudent)))
          : 0;

      const newIdStudent = (maxIdStudent + 1).toString();

      const studentData = { ...data, idstudent: newIdStudent };

      const docRef = await db.collection("student").add(studentData);
      return docRef.id;
    } catch (error) {
      throw new Error("Error creando estudiante: " + error.message);
    }
  }

  static async updateStudent(id, data) {
    try {
      const studentref = db.collection("student").doc(id);
      const studentDoc = await studentref.get();

      if (!studentDoc.exists) {
        throw new Error("Estudiante no encontrado");
      }

      await studentref.update(data);
      return { id, ...data };
    } catch (error) {
      throw new Error("Error actualizando estudiante: " + error.message);
    }
  }

  static async deleteStudent(id) {
    try {
      const studentref = db.collection("student").doc(id);
      const studentDoc = await studentref.get();

      if (!studentDoc.exists) {
        throw new Error("Estudiante no encontrado");
      }

      await studentref.delete(); // Elimina el documento del estudiante
      return { message: "Estudiante eliminado con éxito" };

    } catch (error) {
      throw new Error("Error eliminando estudiante: " + error.message);
    }
  }
}

module.exports = Student;
