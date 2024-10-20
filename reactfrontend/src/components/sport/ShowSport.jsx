import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const URI = "http://localhost:4000/api/deporte/";

const CompShowSport = () => {
  const [sports, setSport] = useState([]);
  useEffect(() => {
    getSports();
  }, []);

  //Procedimiento para mostrar todos los deportes
  const getSports = async () => {
    const res = await axios.get(URI);
    setSport(res.data);
  };

  const deleteSport = async (id) => {
    console.log(id);
    await axios.delete(`${URI}${id}`);
    getSports();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/sport/create" className="button-add">
            <IoMdAddCircle /> Añadir
          </Link>
          <div class="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Deporte</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {sports.map((sport) => (
                  <tr key={sport.id}>
                    <td>{sport.idsport}</td>
                    <td>{sport.namesport}</td>

                    <td>
                      <Link
                        to={`/sport/edit/${sport.id}`}
                        className="button-icon"
                        id="edit"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => deleteSport(sport.id)}
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

export default CompShowSport;
