import styled from "styled-components";
import logo from "../../assets/recreate.svg";
import { v } from "../../styles/Variables";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../App";

import { MdOutlineSportsBaseball, MdCalendarMonth } from "react-icons/md";

import { FaArrowLeft, FaPersonRunning } from "react-icons/fa6";
import { VscGraphLine } from "react-icons/vsc";
import { AiFillThunderbolt } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { FaUser, FaRegClock } from "react-icons/fa";
import { GiWhistle } from "react-icons/gi";

export function Sidebar({ sidebarOpen, setSidebarOpen, setIsAuthenticated }) {
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { setTheme, theme } = useContext(ThemeContext);
  const CambiarTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <Container isOpen={sidebarOpen} themeUse={theme}>
      <button className="Sidebarbutton" onClick={ModSidebaropen}>
        <FaArrowLeft />
      </button>
      <div className="Logocontent">
        <div className="imgcontent">
          <img src={logo} alt="" />
        </div>
        <h2>Centro Deportivo Recreate</h2>
      </div>
      {linksArray.map(({ icon, label, to }) => (
        <div className="LinkContainer" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `Links${isActive ? ` active` : ``}`}
          >
            <div className="Linkicon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
      <Divider />
      {secondarylinksArray.map(({ icon, label, to, onClick }) => (
        <div className="LinkContainer" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `Links${isActive ? ` active` : ``}`}
            onClick={(e) => {
              if (onClick) onClick(e); // Si la función `onClick` existe, la ejecuta
              const token = localStorage.getItem("token"); // Verifica el token en el localStorage
              if (!token) {
                setIsAuthenticated(false); // Si no hay token, desautentica al usuario
              }
            }}
          >
            <div className="Linkicon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
      <Divider />
      <div className="Themecontent">
        {sidebarOpen && <span className="titletheme">Dark mode</span>}
        <div className="Togglecontent">
          <div className="grid theme-container">
            <div className="content">
              <div className="demo">
                <label className="switch" istheme={theme}>
                  <input
                    istheme={theme}
                    type="checkbox"
                    className="theme-swither"
                    onClick={CambiarTheme}
                  ></input>
                  <span istheme={theme} className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

//#region Data links
const linksArray = [
  {
    label: "Deportes",
    icon: <MdOutlineSportsBaseball />,
    to: "/sports",
  },
  {
    label: "Horarios",
    icon: <FaRegClock />,
    to: "/schedule",
  },
  {
    label: "Estudiantes",
    icon: <FaPersonRunning />,
    to: "/student",
  },
  {
    label: "Entrenador",
    icon: <GiWhistle />,
    to: "/coach",
  },
  {
    label: "Mensualidad",
    icon: <MdCalendarMonth />,
    to: "/monthly",
  },
  {
    label: "Dashboard",
    icon: <VscGraphLine />,
    to: "/dashboard",
  },
  {
    label: "Avisos",
    icon: <AiFillThunderbolt />,
    to: "/activity",
  },
  // {
  //   label: "Avisos",
  //   icon: <AiFillThunderbolt />,
  //   to: "/datos",
  // },
];
const secondarylinksArray = [
  // {
  //   label: "Configuracion",
  //   icon: <IoMdSettings />,
  //   to: "/config",
  // },
  {
    label: "Usuario",
    icon: <FaUser />,
    to: "/user",
  },
  {
    label: "Salir",
    icon: <CiLogout />,
    to: "/login",
    onClick: () => {
      localStorage.removeItem("token");
      // Si tienes un estado para manejar la autenticación
    },
  },
];
//#endregion

//#region STYLED COMPONENTS
const Container = styled.div`
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
  position: sticky;
  padding-top: 20px;
  .Sidebarbutton {
    position: absolute;
    top: ${v.xxlSpacing};
    right: -18px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${(props) => props.theme.bgtgderecha};
    box-shadow: 0 0 4px ${(props) => props.theme.bg3},
      0 0 7px ${(props) => props.theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    transform: ${({ isOpen }) => (isOpen ? `initial` : `rotate(180deg)`)};
    border: none;
    letter-spacing: inherit;
    color: inherit;
    font-size: inherit;
    text-align: inherit;
    padding: 0;
    font-family: inherit;
    outline: none;
  }
  .Logocontent {
    display: flex;
    justify-content: center;
    align-items: center;

    padding-bottom: ${v.lgSpacing};
    .imgcontent {
      display: flex;
      img {
        max-width: 100%;
        height: auto;
      }
      cursor: pointer;
      transition: all 0.3s;
      transform: ${({ isOpen }) => (isOpen ? `scale(1)` : `scale(0.8)`)};
    }
    h2 {
      display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
    }
  }
  .LinkContainer {
    margin: 8px 0;

    padding: 0 15%;
    :hover {
      background: ${(props) => props.theme.bg3};
    }
    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${v.smSpacing}-2px) 0;
      color: ${(props) => props.theme.text};
      height: 50px;
      .Linkicon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;

        svg {
          font-size: 25px;
        }
      }
      &.active {
        .Linkicon {
          svg {
            color: ${(props) => props.theme.bg4};
          }
        }
      }
    }
  }
  .Themecontent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .titletheme {
      display: block;
      padding: 10px;
      font-weight: 700;
      opacity: ${({ isOpen }) => (isOpen ? `1` : `0`)};
      transition: all 0.3s;
      white-space: nowrap;
      overflow: hidden;
    }
    .Togglecontent {
      margin: ${({ isOpen }) => (isOpen ? `auto 40px` : `auto 15px`)};
      width: 36px;
      height: 20px;
      border-radius: 10px;
      transition: all 0.3s;
      position: relative;
      .theme-container {
        background-blend-mode: multiply, multiply;
        transition: 0.4s;
        .grid {
          display: grid;
          justify-items: center;
          align-content: center;
          height: 100vh;
          width: 100vw;
          font-family: "Lato", sans-serif;
        }
        .demo {
          font-size: 32px;
          .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
            .theme-swither {
              opacity: 0;
              width: 0;
              height: 0;
              &:checked + .slider:before {
                left: 4px;
                content: "🌑";
                transform: translateX(26px);
              }
            }
            .slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: ${({ themeUse }) =>
                themeUse === "light" ? v.lightcheckbox : v.checkbox};

              transition: 0.4s;
              &::before {
                position: absolute;
                content: "☀️";
                height: 0px;
                width: 0px;
                left: -10px;
                top: 16px;
                line-height: 0px;
                transition: 0.4s;
              }
              &.round {
                border-radius: 34px;

                &::before {
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg3};
  margin: ${v.lgSpacing} 0;
`;
//#endregion
