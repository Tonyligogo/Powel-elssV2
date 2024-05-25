import "./Navbar.css";
import { useAuthContext } from "../../context/AuthProvider";
import { Icon } from "@iconify/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { FaRegUser } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

function Navbar() {
  const {
    currentUser,
    role,
    avatar,
    removeToken,
    screensize,
    setScreensize,
    menuActive,
    setMenuActive,
    userId,
  } = useAuthContext();
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreensize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (screensize <= 900) {
      setMenuActive(false);
    } else {
      setMenuActive(true);
    }
  }, [screensize, setMenuActive]);

  const currentDate = new Date();

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  function handleOpenProfile() {
    setOpenProfile((prev) => !prev);
  }

  function handleOpenProfileSettings() {
    setOpenProfile(false);
  }

  useEffect(() => {
    let secTimer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  const navigate = useNavigate();

  function handleLogOut(e) {
    e.preventDefault();
    const data = { user: userId };
    axios.post("http://localhost:5000/api/auth/logout", data).then(() => {
      removeToken();
      navigate("/LoginPage");
    });
  }

  return (
    <nav>
      <div className="left">
        <div className="greeting">
          <span className="menuBtn">
            {" "}
            {menuActive ? (
              <AiOutlineMenuFold onClick={() => setMenuActive(false)} />
            ) : (
              <AiOutlineMenuUnfold onClick={() => setMenuActive(true)} />
            )}{" "}
          </span>
          <p>
            Hello there,{" "}
            <span style={{ textTransform: "capitalize" }}>{currentUser}</span>
          </p>
          <Icon icon="noto:waving-hand" width="30" />
        </div>
        <div className="dateTime">
          <small>
            {moment(currentDate, moment.ISO_8601).format("MMM Do YY")}
          </small>
          <small>{time}</small>
        </div>
      </div>
      <div className="profileWrapper">
        <Tooltip title="Profile" className="right" onClick={handleOpenProfile}>
          <div>
            {avatar !== null ? (
              <img src={avatar} alt="avatar" className="profilePic" />
            ) : (
              <Icon icon="mingcute:user-4-fill" width="50" />
            )}
            <small style={{ textTransform: "capitalize" }}>{currentUser}</small>
          </div>
        </Tooltip>
        {openProfile && (
          <div className="profilePopup">
            <div className="top">
              <div className="topLeft">
                {avatar !== null ? (
                  <img src={avatar} alt="avatar" className="profilePic" />
                ) : (
                  <Icon icon="mingcute:user-4-fill" width="50" />
                )}
                <p>
                  <small style={{ textTransform: "capitalize" }}>
                    {currentUser}
                  </small>
                  <small style={{ fontSize: "12px" }}>
                    {role} @powel-elss.co
                  </small>
                </p>
              </div>
              <div className="closeBtn" onClick={() => setOpenProfile(false)}>
                <span>x</span>
              </div>
            </div>
            <p className="line"></p>
            <div className="bottom">
              <div
                className="profileSettings"
                onClick={handleOpenProfileSettings}
              >
                <NavLink to="/EditProfile" className="profileLink">
                  <FaRegUser />
                  My Profile
                </NavLink>
                <IoIosArrowForward />
              </div>
              <div className="profileSettings">
                <NavLink to="/" className="profileLink">
                  <HiOutlineUserPlus />
                  Add user
                </NavLink>
                <IoIosArrowForward />
              </div>
              {currentUser ? (
                <div className="logout" onClick={handleLogOut}>
                  <IoMdLogOut />
                  <span>Log out</span>
                </div>
              ) : (
                <div className="profileSettings">
                  <NavLink to="/LoginPage" className="profileLink">
                    <IoMdLogOut />
                    <span>Log in</span>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
