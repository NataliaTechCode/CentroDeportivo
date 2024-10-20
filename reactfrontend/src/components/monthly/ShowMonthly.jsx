import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const URI = "http://localhost:4000/api/mensualidad/";

const CompShowMonthly = () => {
  const [monthlies, setMonthly] = useState([]);
  useEffect(() => {
    getMonthlies();
  }, []);

  //Procedimiento para mostrar todos los mensualidades
  const getMonthlies = async () => {
    const res = await axios.get(URI);
    setMonthly(res.data);
  };

  const deleteMonthly = async (id) => {
    console.log(id);
    await axios.delete(`${URI}${id}`);
    getMonthlies();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/monthly/create" className="button-add">
            <IoMdAddCircle /> Añadir
          </Link>
          <div class="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Estudiante</th>
                  <th>Fecha de inicio</th>
                  <th>fecha de finalización</th>
                  <th>Horario</th>
                  <th>state</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {monthlies.map((monthly) => (
                  <tr key={monthly.id}>
                    <td>{monthly.idmonthly}</td>
                    <td>{monthly.student}</td>
                    <td>{monthly.startdate}</td>
                    <td>{monthly.enddate}</td>
                    <td>{monthly.schedule}</td>
                    <td>{monthly.state}</td>

                    <td>
                      <Link
                        to={`/monthly/edit/${monthly.id}`}
                        className="button-icon"
                        id="edit"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => deleteMonthly(monthly.id)}
                        className="button-icon"
                        id="delete"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompShowMonthly;
