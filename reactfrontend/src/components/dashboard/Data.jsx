import React, { useState, useEffect } from "react";
import BartChart from "./BarChart";
import BoxPlot from "./BoxPlot";
import Cards from "./das";

const data = [
  {
    student: "AD",
    11: 63,
    burger: 170,
    sandwich: 18,
    kebab: 33,
    fries: 189,
    donut: 168,
  },
  {
    student: "AE",
    11: 127,
    burger: 137,
    sandwich: 23,
    kebab: 88,
    fries: 167,
    donut: 49,
  },
  {
    student: "AF",
    11: 97,
    "hot dogColor": "hsl(336, 70%, 50%)",
    burger: 42,
    burgerColor: "hsl(313, 70%, 50%)",
    sandwich: 115,
    sandwichColor: "hsl(81, 70%, 50%)",
    kebab: 49,
    kebabColor: "hsl(167, 70%, 50%)",
    fries: 7,
    friesColor: "hsl(348, 70%, 50%)",
    donut: 193,
    donutColor: "hsl(40, 70%, 50%)",
  },
  {
    student: "AG",
    11: 52,
    "hot dogColor": "hsl(182, 70%, 50%)",
    burger: 51,
    burgerColor: "hsl(216, 70%, 50%)",
    sandwich: 46,
    sandwichColor: "hsl(237, 70%, 50%)",
    kebab: 153,
    kebabColor: "hsl(20, 70%, 50%)",
    fries: 134,
    friesColor: "hsl(303, 70%, 50%)",
    donut: 189,
    donutColor: "hsl(238, 70%, 50%)",
  },
  {
    student: "AI",
    11: 193,
    "hot dogColor": "hsl(198, 70%, 50%)",
    burger: 150,
    burgerColor: "hsl(1, 70%, 50%)",
    sandwich: 118,
    sandwichColor: "hsl(15, 70%, 50%)",
    kebab: 191,
    kebabColor: "hsl(138, 70%, 50%)",
    fries: 21,
    friesColor: "hsl(14, 70%, 50%)",
    donut: 7,
    donutColor: "hsl(143, 70%, 50%)",
  },
  {
    student: "AL",
    11: 82,
    "hot dogColor": "hsl(315, 70%, 50%)",
    burger: 34,
    burgerColor: "hsl(271, 70%, 50%)",
    sandwich: 116,
    sandwichColor: "hsl(169, 70%, 50%)",
    kebab: 188,
    kebabColor: "hsl(331, 70%, 50%)",
    fries: 140,
    friesColor: "hsl(206, 70%, 50%)",
    donut: 50,
    donutColor: "hsl(130, 70%, 50%)",
  },
  {
    student: "AM",
    11: 176,
    "hot dogColor": "hsl(5, 70%, 50%)",
    burger: 188,
    burgerColor: "hsl(36, 70%, 50%)",
    sandwich: 131,
    sandwichColor: "hsl(254, 70%, 50%)",
    kebab: 128,
    kebabColor: "hsl(190, 70%, 50%)",
    fries: 90,
    friesColor: "hsl(314, 70%, 50%)",
    donut: 140,
    donutColor: "hsl(212, 70%, 50%)",
  },
];

//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://localhost:4000/api/estudiante'); // URL del backend
//                 const result = await response.json();
//                 setData(result);
//             } catch (error) {
//                 console.log("aS")
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div style={{ height: '500px' }}>
//             <h1>Estadísticas del Centro Deportivo</h1>
//             {data.length > 0 ? <BartChart data={data} /> : <p>Cargando datos...</p>}
//         </div>
//     );
// };

const Das = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "500px",
      }}
    >
      <Cards></Cards>
      <div style={{ flex: 1, marginRight: "10px" }}>
        <h2>Estadísticas del Centro Deportivo - Gráfico de Barras</h2>
        <BartChart data={data} />
      </div>
      {/* <div style={{ flex: 1, marginLeft: "10px" }}>
        <h2>Estadísticas del Centro Deportivo - Box Plot</h2>
        <BoxPlot data={data2} />
      </div> */}
    </div>
  );
};

export default Das;
