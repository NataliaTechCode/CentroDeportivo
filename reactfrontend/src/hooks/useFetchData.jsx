import { useState, useEffect } from "react";

const useFetchData = () => {
  const [students, setStudents] = useState(0);
  const [allStudents, setAllStudents] = useState(0);
  const [coach, setCoach] = useState(0);
  const [activeStudentsData, setActiveStudentsData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [monthlyClassification, setMonthlyClassification] = useState([]);

  const getMonthlyData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/mensualidad/");
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();

      // Filtrar estudiantes con mensualidades activas
      const filterStudentsByDate = (data) => {
        const currentDate = new Date();

        const activeStudents = data.filter((student) => {
          const endDate = new Date(student.enddate);
          return endDate >= currentDate; // Mensualidades vigentes
        });

        const uniqueActiveStudents = new Set(
          activeStudents.map((student) => student.ci)
        );

        return uniqueActiveStudents.size;
      };

      const activeStudentCount = filterStudentsByDate(data);
      setStudents(activeStudentCount); // Guardar la cantidad en el estado
    } catch (error) {
      console.error("Error al obtener los datos de mensualidad:", error);
    }
  };

  const getStudentData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/estudiante");
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      const data = await response.json();

      // Total de estudiantes que se inscribieron
      setAllStudents(data.length);

      setCoach(data.length);
    } catch (error) {
      console.error("Error al obtener los datos de estudiantes:", error);
    }
  };

  const getCoachData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/entrenador/");
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      const data = await response.json();
      setCoach(data.length);
    } catch (error) {
      console.error("Error al obtener los datos de entrenadores:", error);
    }
  };

  const getActiveStudentsBySport = async () => {
    try {
      const sportsResponse = await fetch("http://localhost:4000/api/deporte");
      if (!sportsResponse.ok) {
        throw new Error(
          `Error en la solicitud de deportes: ${sportsResponse.status}`
        );
      }
      const sportsData = await sportsResponse.json();

      const monthlyResponse = await fetch(
        "http://localhost:4000/api/mensualidad/"
      );
      if (!monthlyResponse.ok) {
        throw new Error(
          `Error en la solicitud de mensualidades: ${monthlyResponse.status}`
        );
      }
      const monthlyData = await monthlyResponse.json();

      // Filtrar estudiantes con mensualidades vigentes
      const currentDate = new Date();
      const activeStudents = monthlyData.filter((student) => {
        const endDate = new Date(student.enddate);
        return endDate >= currentDate; // Mensualidades vigentes
      });

      // Crear array de objetos con formato requerido
      const formattedData = sportsData.map((sport) => {
        const studentCount = activeStudents.filter(
          (student) => student.sport === sport.namesport
        ).length;
        return {
          id: sport.namesport, // id igual al nombre del deporte
          label: sport.namesport, // label igual al nombre del deporte
          value: studentCount, // cantidad de estudiantes
        };
      });

      setActiveStudentsData(formattedData); // Guardar en el estado
    } catch (error) {
      console.error("Error al obtener datos de mensualidades vigentes:", error);
    }
  };

  const getScheduleAvailability = async () => {
    try {
      const sportsResponse = await fetch("http://localhost:4000/api/deporte");
      const schedulesResponse = await fetch(
        "http://localhost:4000/api/horario"
      );

      if (!sportsResponse.ok || !schedulesResponse.ok) {
        throw new Error("Error en la solicitud de deportes o horarios");
      }

      const sportsData = await sportsResponse.json();
      const schedulesData = await schedulesResponse.json();

      // Crear una estructura por deporte
      const formattedScheduleData = sportsData.map((sport) => {
        const relatedSchedules = schedulesData.filter(
          (schedule) =>
            schedule.sport.toLowerCase() === sport.namesport.toLowerCase()
        );

        // Contar horarios disponibles y no disponibles
        let available = 0;
        let notAvailable = 0;

        relatedSchedules.forEach((schedule) => {
          const { totalstudents, limitStudents } = schedule;
          console.log(totalstudents);
          if (totalstudents >= limitStudents) {
            notAvailable++;
          } else {
            available++;
          }
        });

        return {
          sport: sport.namesport,
          Disponible: available,
          "No Disponible": notAvailable,
        };
      });

      setScheduleData(formattedScheduleData); // Guardar en el estado
    } catch (error) {
      console.error("Error al obtener datos de horarios:", error);
    }
  };
  /**/
  const fetchAndProcessData = async () => {
    try {
      const mensualidadesResponse = await fetch(
        "http://localhost:4000/api/mensualidad"
      );
      if (!mensualidadesResponse.ok) {
        throw new Error(
          `Error al obtener mensualidades: ${mensualidadesResponse.status}`
        );
      }
      const mensualidades = await mensualidadesResponse.json();

      const deportesResponse = await fetch("http://localhost:4000/api/deporte");
      if (!deportesResponse.ok) {
        throw new Error(
          `Error al obtener deportes: ${deportesResponse.status}`
        );
      }
      const deportes = await deportesResponse.json();

      const currentDate = new Date();
      const DAYS_THRESHOLD = 7; // Número de días para la condición "Por vencer"

      // Función para clasificar mensualidades
      const classifyMonthly = (endDate) => {
        const end = new Date(endDate);
        const daysDifference = (end - currentDate) / (1000 * 60 * 60 * 24); // Diferencia en días
        if (daysDifference > DAYS_THRESHOLD) {
          return "Activa";
        } else if (daysDifference > 0) {
          return "Por vencer";
        } else {
          return "Vencida";
        }
      };

      // Procesar mensualidades por deporte
      const result = deportes.map((deporte) => {
        const filteredBySport = mensualidades.filter(
          (mensualidad) => mensualidad.sport === deporte.namesport
        );

        const counts = filteredBySport.reduce(
          (acc, mensualidad) => {
            const classification = classifyMonthly(mensualidad.enddate);
            acc[classification] += 1;
            return acc;
          },
          { Activa: 0, "Por vencer": 0, Vencida: 0 }
        );

        return {
          Deporte: deporte.namesport,
          ...counts,
        };
      });

      console.log(result); // Imprimir el resultado para verificar
      setMonthlyClassification(result);
      return result;
    } catch (error) {
      console.error("Error procesando los datos:", error);
    }
  };
  /*/**/
  useEffect(() => {
    getMonthlyData();
    getStudentData();
    getCoachData();
    getActiveStudentsBySport();
    getScheduleAvailability();
    fetchAndProcessData();
  }, []);

  return {
    students,
    allStudents,
    coach,
    activeStudentsData,
    scheduleData, // Retorna también los horarios
    monthlyClassification,
  };
};

export default useFetchData;
