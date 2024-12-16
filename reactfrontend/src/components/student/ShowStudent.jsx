import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const URI = "http://localhost:4000/api/estudiante/";

const CompShowStudents = () => {
  const [students, setStudent] = useState([]);
  useEffect(() => {
    getStudents();
  }, []);

  //Procedimiento para mostrar todos los estudiantes
  const getStudents = async () => {
    const res = await axios.get(URI);
    setStudent(res.data);
  };

  const deleteStudent = async (id) => {
    console.log(id);
    await axios.delete(`${URI}${id}`);
    getStudents();
  };

  const calculateAge = (birthDate) => {
    //   console.log(birthDate);
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--; // Si no ha cumplido años este año, restamos 1
    }
    return age;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/student/create" className="button-add">
            <IoMdAddCircle /> Añadir
          </Link>
          <div class="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>CI</th>
                  <th>Teléfono</th>
                  <th>Edad</th>
                  {/* <th>Foto</th> */}
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.idstudent}</td>
                    <td>{student.name}</td>
                    <td>{student.lastname}</td>
                    <td>{student.ci}</td>
                    <td>{student.phone}</td>
                    <td>{calculateAge(student.birth)}</td>
                    {/* <td>
                      <img
                        src={student.photostudent}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </td> */}
                    {/* <td>{student.photostudent}</td> */}
                    {/* <td>{student.photostudent}</td> */}
                    <td>
                      <Link
                        to={`/student/edit/${student.id}`}
                        className="button-icon"
                        id="edit"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => deleteStudent(student.id)}
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

export default CompShowStudents;
