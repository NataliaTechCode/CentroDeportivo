// import "../../styles/Dashboard.css";
// // import "../../styles/Cards.css";
// import useFetchData from "../../hooks/useFetchData";

// const data = [{ id: 1, sport: "natacion", estudiantes: 4 }];

// const ShowDashboarda = () => {
//   const { students, allStudents, coach } = useFetchData();

//   // Aseguramos que 'students' tenga un valor válido antes de modificar 'data'
//   const updatedData = data.map((item) => ({
//     ...item,
//     estudiantes: students, // Asumiendo que 'students' es el nuevo valor que quieres usar
//   }));
//   console.log(data);
//   console.log(updatedData);

//   return (
//     <div>
//       {/* Aquí puedes mostrar el array actualizado en el componente */}
//       <pre>{JSON.stringify(updatedData, null, 2)}</pre>
//     </div>
//   );
// };

// export default ShowDashboarda;
