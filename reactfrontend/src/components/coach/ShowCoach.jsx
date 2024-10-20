import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const URI = "http://localhost:4000/api/entrenador/";

const CompShowCoach = () => {
  const [coaches, setCoach] = useState([]);
  useEffect(() => {
    getCoaches();
  }, []);

  //Procedimiento para mostrar todos los entrenadores
  const getCoaches = async () => {
    const res = await axios.get(URI);
    setCoach(res.data);
  };

  const deleteCoach = async (id) => {
    console.log(id);
    await axios.delete(`${URI}${id}`);
    getCoaches();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/coach/create" className="button-add">
            <IoMdAddCircle /> Añadir
          </Link>
          <div class="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {coaches.map((coach) => (
                  <tr key={coach.id}>
                    <td>{coach.idcoach}</td>
                    <td>{coach.namecoach}</td>
                    <td>{coach.phone}</td>

                    <td>
                      <Link
                        to={`/coach/edit/${coach.id}`}
                        className="button-icon"
                        id="edit"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => deleteCoach(coach.id)}
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

export default CompShowCoach;
