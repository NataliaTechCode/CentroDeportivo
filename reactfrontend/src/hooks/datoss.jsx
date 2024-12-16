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

  // const getMonth = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4000/api/mensualidad/");
  //     if (!response.ok) {
  //       throw new Error(`Error en la solicitud: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setMonthlyData(data);
  //   } catch (error) {
  //     console.error("Error al obtener los datos de mensualidad:", error);
  //   }
  // };

  // Inicializar datos
  useEffect(() => {
    setMonthlyData(monthly);
    setStudentData(student);
    setSportsData(sport);
    setCoachData(coach);
    setScheduleData(schedule);
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
    if (!sportsData.length || !monthlyData.length) return;

    const dataBySport = sportsData.map((sport) => {
      const monthlyCounts = Array(12).fill(0);

      const sportEnrollments = monthlyData.filter(
        (student) => student.sport === sport.namesport
      );

      sportEnrollments.forEach((student) => {
        const startDate = new Date(student.startdate);
        const month = startDate.getMonth();
        monthlyCounts[month] += 1;
      });

      const formattedData = monthlyCounts.map((count, index) => ({
        x: getMonthName(index),
        y: count,
      }));

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
