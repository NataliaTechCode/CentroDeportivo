import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { FaEye } from "react-icons/fa";

const URI = "http://localhost:4000/api/mensualidad/";
const URIE = "http://localhost:4000/api/estudiante";

const CompState = () => {
  const [monthlies, setMonthly] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getMonthlies();
    getStudents();
  }, []);

  // Fetch monthly data
  const getMonthlies = async () => {
    const res = await axios.get(URI);
    setMonthly(res.data);
    console.log(res.data);
  };

  // Fetch student data
  const getStudents = async () => {
    const res = await axios.get(URIE);
    setStudents(res.data);
    console.log(res.data);
  };

  const getSubscriptionStatus = (endDate) => {
    const endDateObject = new Date(endDate); // Convert the endDate to a Date object
    const currentDate = new Date(); // Get the current system date

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = endDateObject - currentDate;

    // Convert milliseconds to days
    const remainingDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    // Determine the status based on the remaining days
    if (remainingDays > 7) {
      return "Activa";
    } else if (remainingDays >= 0) {
      return "Vencimiento pronto";
    } else {
      return "Expirado";
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Estudiante</th>
                  <th>CI</th>
                  <th>Foto</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {monthlies.map((monthly) => {
                  // Find the corresponding student by student ID
                  const student = students.find((s) => s.ci === monthly.ci);
                  const studentPhoto = student ? student.photostudent : ''; // Get the student's photo URL
                  console.log(studentPhoto)

                  return (
                    <tr key={monthly.idmonthly}>
                      <td>{monthly.idmonthly}</td>
                      <td>{monthly.student}</td>
                      <td>{monthly.ci}</td>
                      <td>
                        {studentPhoto ? (
                          <img src="/photos/perfil.jpeg"
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        ) : (
                          "No Photo"
                        )}
                      </td>
                      <td>{getSubscriptionStatus(monthly.enddate)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompState;
