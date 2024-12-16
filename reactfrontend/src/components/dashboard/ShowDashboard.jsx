import Cards from "./graphics/Cards";
import BartChart from "./graphics/BartChart";
// import Marimekko from "./graphics/MarimekkoChart";
import Pie from "./graphics/PieChart";
import BartHorizontal from "./graphics/BartHorizontal";
import Line from "./graphics/LineChart";
import "../../styles/Dashboard.css";

// import useFetchData from "../../hooks/useFetchData";
import useDatos from "../../hooks/datoss";

const ShowDashboard = () => {
  // const { students, allStudents, coach } = useFetchData();
  // const { activeStudentsData, scheduleData, monthlyClassification } =
  //   useFetchData([]);

  const { students, allstudents, allcoach } = useDatos();
  const { studentSports, scheduleSports, monthlySports, mothSports } = useDatos(
    []
  );

  // console.log(mothSports);
  // const data3 = Array.isArray(activeStudentsData) ? activeStudentsData : [];

  return (
    <div>
      <div className="cards-container">
        <Cards
          title="Estudiantes Actuales"
          value={allstudents}
          color="#124b98"
        />
        <Cards title="Total Estudiantes" value={students} color="#f9a11b" />
        <Cards title="Total Entrenadores" value={allcoach} color="#f9dc1c" />
      </div>
      <div className="chartlong marimekko">
        <Line data={mothSports} />
      </div>
      <div className="dashboard">
        <div className="chart pie-chart">
          <Pie data={studentSports} />
        </div>
        <div className="chart bar-chart">
          <BartChart data={monthlySports}></BartChart>
        </div>
      </div>

      <div className="dashboard">
        <div className="chartlong pie-chart">
          <BartHorizontal data={scheduleSports} />
        </div>
      </div>
    </div>
  );
};

export default ShowDashboard;
