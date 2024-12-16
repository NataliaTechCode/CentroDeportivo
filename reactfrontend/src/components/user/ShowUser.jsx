import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const URI = "http://localhost:4000/api/usuario/";

const CompShowUsers = () => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  //Procedimiento para mostrar todos los usuarios
  const getUsers = async () => {
    const res = await axios.get(URI);
    setUser(res.data);
  };

  const deleteUser = async (id) => {
    console.log(id);
    await axios.delete(`${URI}${id}`);
    getUsers();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/user/create" className="button-add">
            <IoMdAddCircle /> Añadir
          </Link>
          <div class="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Usuario</th>
                  <th>Contraseña</th>
                  <th>Email</th>
                  <th>Rol</th>
                  {/* <th>Permisos</th> */}
                  {/* <th>Fecha Creada</th> */}
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.iduser}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{"*".repeat(Math.floor(user.password.length / 2))}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    {/* <td>{user.createdAt}</td> */}
                    {/* <td>
                      <Link
                        to={`/edit/${user.id}`}
                        className="button-icon"
                        id="edit"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        // onClick={() => deleteUser(user.id)}
                        className="button-icon"
                        id="eye"
                      >
                        <FaEye />
                      </button>
                    </td> */}
                    <td>
                      <Link
                        to={`/user/edit/${user.id}`}
                        className="button-icon"
                        id="edit"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => deleteUser(user.id)}
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

export default CompShowUsers;
