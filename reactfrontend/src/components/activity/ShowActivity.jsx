import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const URI = "http://localhost:4000/api/actividad/";

const CompShowActivity = () => {
  const [activity, setActivity] = useState([]);
  useEffect(() => {
    getActivity();
  }, []);

  //Procedimiento para mostrar todos los actividades
  const getActivity = async () => {
    const res = await axios.get(URI);
    setActivity(res.data);
  };

  const deleteActivity = async (id) => {
    console.log(id);
    await axios.delete(`${URI}${id}`);
    getActivity();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/activity/create" className="button-add">
            <IoMdAddCircle /> Añadir
          </Link>
          <div class="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Actividad</th>
                  <th>Descripción</th>
                  <th>Fecha de la actividad</th>
                  <th>Foto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {activity.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.idactivity}</td>
                    <td>{activity.nameactivity}</td>
                    <td>{activity.description}</td>
                    <td>{activity.dateActivity}</td>
                    <td>{activity.photo}</td>
                    <td>
                      <Link
                        to={`/activity/edit/${activity.id}`}
                        className="button-icon"
                        id="edit"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => deleteActivity(activity.id)}
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

export default CompShowActivity;
