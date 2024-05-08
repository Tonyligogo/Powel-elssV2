import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

function Sidebar() {
  const [dropdown, setDropdown] = useState(false);

  function openDropdown() {
      setDropdown2(false);
    setDropdown((prev) => !prev);
  }
  const [dropdown2, setDropdown2] = React.useState(false);

  function openDropdown2() {
      setDropdown(false);
    setDropdown2((prev) => !prev);
  }

  const { currentUser, removeToken } = useAuthContext();

  const navigate = useNavigate();

  function handleLogOut(e) {
    e.preventDefault();
    const data = { username: currentUser };
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
      <aside>
        <h2 className="name">powel-elss</h2>
        <div className="dashboard">
          <span className="heading">DASHBOARD</span>
          <NavLink to="/" className="homeButton">
            Home
          </NavLink>
        </div>
        <div className="pages">
          <span className="heading">PAGES</span>
          <div className="linksWrapper">
            <p onClick={openDropdown}>
              Staff
            </p>
            <ul className={`${dropdown && "dropDownActive"}`}>
              <li>
                <NavLink to="/StaffRecords" className="nav">
                  Staff Records
                </NavLink>
              </li>
              <li>
                <NavLink to="/NewUser" className="nav">
                  Add new staff
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="linksWrapper">
            <p onClick={openDropdown2}>
              Forms
            </p>
            <ul className={`${dropdown2 && "dropDownActive"}`}>
              <li>
                <NavLink to="/AllowancesForm" className="nav">
                  Allowance Form
                </NavLink>
              </li>
              <li>
                <NavLink to="/DeductionForm" className="nav">
                  Deduction Form
                </NavLink>
              </li>
              <li>
                <NavLink to="/PaySlipForm" className="nav">
                  Pay Slip
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/ExpenseForm" className="nav">
            Expense Form
          </NavLink>
          <NavLink to="/Products" className="nav">
            Products
          </NavLink>
          <NavLink to="/CustomerRecords" className="nav">
            Our Customers
          </NavLink>
          <NavLink to="/CreateQuotation" className="nav">
            Generate Quotation
          </NavLink>
          <NavLink to="/MakeSale" className="nav">
            Make sale
          </NavLink>
        </div>
        <button onClick={handleLogOut} className="logoutButton">
          Log out
        </button>
      </aside>
  );
}

export default Sidebar;
