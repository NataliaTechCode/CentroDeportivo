import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import "./styles/Table.css";
import "./styles/Forms.css";

//importacion de Componentes
// import Login from "./components/login/Login";
import LoginComponent from "./components/login/Login";

import CompShowStudents from "./components/student/ShowStudent";
import CompCreateStudent from "./components/student/CreateStudent";
import CompEditStudent from "./components/student/EditStudent";

import CompShowUsers from "./components/user/ShowUser";
import CompCreateUser from "./components/user/CreateUser";
import CompEditUser from "./components/user/EditUser";

import CompShowCoach from "./components/coach/ShowCoach";
import CompCreateCoach from "./components/coach/CreateCoach";
import CompEditCoach from "./components/coach/EditCoach";

import CompShowMonthly from "./components/monthly/ShowMonthly";
import CompCreateMonthly from "./components/monthly/CreateMonthly";
import CompEditMonthly from "./components/monthly/EditMonthly";

import CompShowActivity from "./components/activity/ShowActivity";
import CompCreateActivity from "./components/activity/CreateActivity";
import CompEditActivity from "./components/activity/EditActivity";

import CompShowSport from "./components/sport/ShowSport";
import SportsList from "./components/sport/Sports";
import CompCreateSport from "./components/sport/CreateSport";
import CompEditSport from "./components/sport/EditSport";

import CompShowSchedule from "./components/schedule/ShowSchedule";
import CompShowScheduleSport from "./components/schedule/ShowScheduleSport";
import CompCreateSchedule from "./components/schedule/CreateSchedule";
import CompEditSchedule from "./components/schedule/EditSchedule";

//proteccion
import ProtectedRoute from "./components/login/ProtectedRoute";

//dashboard
import ShowDashboard from "./components/dashboard/ShowDashboard";
// import MonthlyData from "./components/dashboard/Dashboard";

//pruebas
// import ShowDashboarda from "./components/dashboard/aass";
// import Datos from "./hooks/datoss";
import OtroArchivo from "./hooks/dat";
export const ThemeContext = React.createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token"); // Convierte la existencia del token en un booleano
  });

  return (
    <div className="App">
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/student" />
                  ) : (
                    <LoginComponent setIsAuthenticated={setIsAuthenticated} />
                  )
                }
              />
            </Routes>

            <Container className={sidebarOpen ? "sidebarState active" : ""}>
              {isAuthenticated && (
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}

              <Routes>
                <Route
                  path="/student"
                  element={
                    <ProtectedRoute>
                      <CompShowStudents />
                    </ProtectedRoute>
                  }
                />
                {/* dashboard */}
                {/* <Route path="/prueba" element={<ShowDashboarda />} /> */}
                {/* <Route path="/datos" element={<MonthlyData />} /> */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <ShowDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/datos"
                  element={
                    <ProtectedRoute>
                      <OtroArchivo />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/student/create"
                  element={
                    <ProtectedRoute>
                      <CompCreateStudent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/edit/:id"
                  element={
                    <ProtectedRoute>
                      <CompEditStudent />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/user"
                  element={
                    <ProtectedRoute>
                      <CompShowUsers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/create"
                  element={
                    <ProtectedRoute>
                      <CompCreateUser />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/edit/:id"
                  element={
                    <ProtectedRoute>
                      <CompEditUser />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/coach"
                  element={
                    <ProtectedRoute>
                      <CompShowCoach />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/coach/create"
                  element={
                    <ProtectedRoute>
                      <CompCreateCoach />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/coach/edit/:id"
                  element={
                    <ProtectedRoute>
                      <CompEditCoach />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/monthly"
                  element={
                    <ProtectedRoute>
                      <CompShowMonthly />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/monthly/create"
                  element={
                    <ProtectedRoute>
                      <CompCreateMonthly />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/monthly/edit/:id"
                  element={
                    <ProtectedRoute>
                      <CompEditMonthly />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/activity"
                  element={
                    <ProtectedRoute>
                      <CompShowActivity />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/activity/create"
                  element={
                    <ProtectedRoute>
                      <CompCreateActivity />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/activity/edit/:id"
                  element={
                    <ProtectedRoute>
                      <CompEditActivity />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/sports"
                  element={
                    <ProtectedRoute>
                      <SportsList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sport"
                  element={
                    <ProtectedRoute>
                      <CompShowSport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sport/create"
                  element={
                    <ProtectedRoute>
                      <CompCreateSport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sport/edit/:id"
                  element={
                    <ProtectedRoute>
                      <CompEditSport />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/schedule"
                  element={
                    <ProtectedRoute>
                      <CompShowSchedule />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sport/:sportName"
                  element={
                    <ProtectedRoute>
                      <CompShowScheduleSport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sport/schedule/create"
                  element={
                    <ProtectedRoute>
                      <CompCreateSchedule />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/schedule/edit/:id"
                  element={
                    <ProtectedRoute>
                      <CompEditSchedule />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  &.active {
    grid-template-columns: 300px auto;
  }
  color: ${({ theme }) => theme.text};
`;
export default App;
