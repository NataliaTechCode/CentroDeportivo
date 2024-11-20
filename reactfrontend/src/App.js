import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import "./styles/Table.css";
import "./styles/Forms.css";

//importacion de Componentes
import Login from "./components/login/Login";

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

//dashboard

export const ThemeContext = React.createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                    <Login setIsAuthenticated={setIsAuthenticated} />
                  )
                }
              />
            </Routes>

            <Container className={sidebarOpen ? "sidebarState active" : ""}>
              {isAuthenticated && (
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
              )}

              <Routes>
                <Route
                  path="/student"
                  element={
                    isAuthenticated ? (
                      <CompShowStudents />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route path="/student/create" element={<CompCreateStudent />} />
                <Route path="/student/edit/:id" element={<CompEditStudent />} />

                <Route path="/user" element={<CompShowUsers />} />
                <Route path="/user/create" element={<CompCreateUser />} />
                <Route path="/user/edit/:id" element={<CompEditUser />} />

                <Route path="/coach" element={<CompShowCoach />} />
                <Route path="/coach/create" element={<CompCreateCoach />} />
                <Route path="/coach/edit/:id" element={<CompEditCoach />} />

                <Route path="/monthly" element={<CompShowMonthly />} />
                <Route path="/monthly/create" element={<CompCreateMonthly />} />
                <Route path="/monthly/edit/:id" element={<CompEditMonthly />} />

                <Route path="/activity" element={<CompShowActivity />} />
                <Route
                  path="/activity/create"
                  element={<CompCreateActivity />}
                />
                <Route
                  path="/activity/edit/:id"
                  element={<CompEditActivity />}
                />

                <Route path="/sports" element={<SportsList />} />
                <Route path="/sport" element={<CompShowSport />} />
                <Route path="/sport/create" element={<CompCreateSport />} />
                <Route path="/sport/edit/:id" element={<CompEditSport />} />

                <Route path="/schedule" element={<CompShowSchedule />} />
                <Route
                  path="/sport/:sportName"
                  element={<CompShowScheduleSport />}
                />
                <Route
                  path="/sport/schedule/create"
                  element={<CompCreateSchedule />}
                />
                <Route
                  path="/schedule/edit/:id"
                  element={<CompEditSchedule />}
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
