import { useState, useEffect, useCallback } from "react";
import { monthly } from "../data/monthly";
import { student } from "../data/student";
import { sport } from "../data/sport";
import { coach } from "../data/coach";
import { schedule } from "../data/schedule";

const useDatos = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [coachData, setCoachData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);

  const [students, setStudents] = useState(0);
  const [allstudents, setAllstudents] = useState(0);
  const [allcoach, setAllcoach] = useState(0);
  const [studentSports, setStudetSports] = useState([]);
  const [scheduleSports, setScheduleSports] = useState([]);
  const [monthlySports, setMonthlySports] = useState([]);
  const [mothSports, setMothSports] = useState([]);

  // Inicializar datos
  useEffect(() => {
    console.log("Ejecutando useEffect para obtener datos"); // Indicador de ejecución del useEffect

    const fetchData = async () => {
      try {
        console.log("Llamando a la API"); // Indicador de inicio de la llamada a la API
        const [
          monthlyResponse,
          studentResponse,
          sportResponse,
          coachResponse,
          scheduleResponse,
        ] = await Promise.all([
          fetch("http://localhost:4000/api/mensualidad/"),
          fetch("http://localhost:4000/api/estudiante/"),
          fetch("http://localhost:4000/api/deporte/"),
          fetch("http://localhost:4000/api/entrenador/"),
          fetch("http://localhost:4000/api/horario/"),
        ]);

        if (
          !monthlyResponse.ok ||
          !studentResponse.ok ||
          !sportResponse.ok ||
          !coachResponse.ok ||
          !scheduleResponse.ok
        ) {
          throw new Error("Error en una de las solicitudes");
        }

        const monthlyData = await monthlyResponse.json();
        const studentData = await studentResponse.json();
        const sportsData = await sportResponse.json();
        const coachData = await coachResponse.json();
        const scheduleData = await scheduleResponse.json();

        setMonthlyData(monthlyData);
        setStudentData(studentData);
        setSportsData(sportsData);
        setCoachData(coachData);
        setScheduleData(scheduleData);

        console.log("Datos obtenidos y guardados correctamente"); // Indicador de éxito
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Filtrar estudiantes con mensualidad activa
  useEffect(() => {
    if (!monthlyData.length) return;

    const currentDate = new Date();
    const activeStudents = monthlyData.filter((monthly) => {
      const endDate = new Date(monthly.enddate);
      return endDate >= currentDate;
    });
    const uniqueActiveStudents = new Set(
      activeStudents.map((student) => student.ci)
    );
    setStudents(uniqueActiveStudents.size);
  }, [monthlyData]);

  // Calcular estudiantes por deporte
  useEffect(() => {
    if (!sportsData.length || !monthlyData.length) return;

    const currentDate = new Date();
    const activeStudents = monthlyData.filter((student) => {
      const endDate = new Date(student.enddate);
      return endDate >= currentDate;
    });

    const formattedData = sportsData.map((sport) => {
      const studentCount = activeStudents.filter(
        (student) => student.sport === sport.namesport
      ).length;
      return {
        id: sport.namesport,
        label: sport.namesport,
        value: studentCount,
      };
    });

    setStudetSports(formattedData);
  }, [sportsData, monthlyData]);

  // Calcular disponibilidad de horarios
  useEffect(() => {
    if (!sportsData.length || !scheduleData.length) return;

    const formattedScheduleData = sportsData.map((sport) => {
      const relatedSchedules = scheduleData.filter(
        (schedule) =>
          schedule.sport.toLowerCase() === sport.namesport.toLowerCase()
      );

      let available = 0;
      let notAvailable = 0;

      relatedSchedules.forEach((schedule) => {
        const { totalstudents, limitStudents } = schedule;
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

    setScheduleSports(formattedScheduleData);
  }, [sportsData, scheduleData]);

  // Clasificación de mensualidades
  useEffect(() => {
    if (!sportsData.length || !monthlyData.length) return;

    const currentDate = new Date();
    const DAYS_THRESHOLD = 7;

    const classifyMonthly = (endDate) => {
      const end = new Date(endDate);
      const daysDifference = (end - currentDate) / (1000 * 60 * 60 * 24);
      if (daysDifference > DAYS_THRESHOLD) {
        return "Activa";
      } else if (daysDifference > 0) {
        return "Por vencer";
      } else {
        return "Vencida";
      }
    };

    const result = sportsData.map((sport) => {
      const filteredBySport = monthlyData.filter(
        (mensualidad) => mensualidad.sport === sport.namesport
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
        Deportes: sport.namesport,
        ...counts,
      };
    });

    setMonthlySports(result);
  }, [sportsData, monthlyData]);

  // Calcular mensualidades por mes
  useEffect(() => {
    console.log("en datoos");
    if (!sportsData.length || !monthlyData.length) return;

    const dataBySport = sportsData.map((sport) => {
      const monthlyCounts = Array(12).fill(0);

      const sportEnrollments = monthlyData.filter(
        (student) => student.sport === sport.namesport
      );

      sportEnrollments.forEach((student) => {
        try {
          const startDate = new Date(student.startdate);

          // Si startDate no es válido, simplemente ignoramos este estudiante sin imprimir nada
          if (isNaN(startDate)) {
            return; // Salta el procesamiento de este estudiante
          }

          const month = startDate.getMonth();

          // Si month no está en el rango 0-11, ignoramos este estudiante sin mostrar un error
          if (month >= 0 && month <= 11) {
            monthlyCounts[month] += 1;
          }
        } catch (error) {
          // En caso de que haya un error (por ejemplo, si `student.startdate` está mal formateado), lo ignoramos
          return;
        }
      });

      const formattedData = monthlyCounts.map((count, index) => ({
        x: getMonthName(index),
        y: count,
      }));

      console.log("en datoos final");
      return {
        id: sport.namesport,
        data: formattedData,
      };
    });

    setMothSports(dataBySport);
  }, [sportsData, monthlyData]);

  const getMonthName = (monthIndex) => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return months[monthIndex];
  };

  // Datos totales de estudiantes y entrenadores
  useEffect(() => {
    // getStudents();
    setAllstudents(studentData.length);
    setAllcoach(coachData.length);
  }, [studentData, coachData]);

  return {
    students,
    allstudents,
    allcoach,
    studentSports,
    scheduleSports,
    monthlySports,
    mothSports,
  };
};

export default useDatos;
