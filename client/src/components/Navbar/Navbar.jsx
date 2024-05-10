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
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

function Navbar() {
  const { currentUser, removeToken, screensize, setScreensize, menuActive, setMenuActive, userId } =
    useAuthContext();
  const [openProfile, setOpenProfile] = useState(false);
  const [openProfileSettings, setOpenProfileSettings] = useState(false);

  // callback function to receive state changes from Edit Profile component
  const handleCloseProfileSettings = (closeProfileSettings) => {
    setOpenProfileSettings(closeProfileSettings);
  };

  useEffect(() => {
    const handleResize = () => setScreensize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  },[]);

  useEffect(() => {
    if (screensize <= 900) {
      setMenuActive(false);
    } else {
      setMenuActive(true);
    }
  },[screensize]);

  const currentDate = new Date();

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  function handleOpenProfile() {
    setOpenProfileSettings(false);
    setOpenProfile((prev) => !prev);
  }

  function handleOpenProfileSettings() {
    setOpenProfile(false);
    setOpenProfileSettings(true);
  }

  useEffect(() => {
    let secTimer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  const navigate = useNavigate();
  console.log(userId)

  function handleLogOut(e) {
    e.preventDefault();
    const data = { user: userId };
    axios
      .post("http://localhost:5000/api/auth/logout", data, {
        headers: { authorization: "jwt " + sessionStorage.getItem("token") },
      })
      .then(() => {
        removeToken();
        navigate("/LoginPage");
      });
  }

  return (
    <nav>
      <div className="left">
            <div className="greeting">
            <span className="menuBtn"> {menuActive ? 
            <AiOutlineMenuFold onClick={()=>setMenuActive(false)}/> 
            : 
            <AiOutlineMenuUnfold onClick={()=>setMenuActive(true)}/> } </span> 
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
          <Icon icon="mingcute:user-4-fill" color="gray" width="30" />
          <small style={{ textTransform: "capitalize" }}>{currentUser}</small>
        </Tooltip>
        {openProfile && (
          <div className="profilePopup">
            <div className="top">
              <div className="topLeft">
                <Icon icon="mingcute:user-4-fill" color="gray" width="50" />
                <p>
                  <small style={{ textTransform: "capitalize" }}>
                    {currentUser}
                  </small>
                  <small style={{ color: "grey", fontSize: "12px" }}>
                    Role @powel-elss.co
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
                <p>
                  <FaRegUser />
                  <span>My Profile</span>
                </p>
                <IoIosArrowForward />
              </div>
              <div className="profileSettings">
                <p>
                  <HiOutlineUserPlus />
                  <span>Add user</span>
                </p>
                <IoIosArrowForward />
              </div>
              <div className="logout" onClick={handleLogOut}>
                <IoMdLogOut />
                <span>Log out</span>
              </div>
            </div>
          </div>
        )}
        {openProfileSettings && (
          <div className="profilePopupSettings">
            <EditProfile onCloseProfileSettings={handleCloseProfileSettings} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
