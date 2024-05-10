import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdPeopleAlt , MdTableRows } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { IoBagCheckSharp, IoNewspaper } from "react-icons/io5";
import { FaUserPlus, FaFolderOpen , FaTableList, FaFileCircleMinus, FaFileCirclePlus, FaDropbox, FaUsers } from "react-icons/fa6";

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

  return (
      <aside>
        <h2 className="name">powel-elss</h2>
        <div className="dashboard">
          <span className="heading">DASHBOARD</span>
          <NavLink to="/" className="homeButton">
          <MdDashboard />
            Home
          </NavLink>
        </div>
        <div className="pages">
          <span className="heading">PAGES</span>
          <div className="linksWrapper">
            <p onClick={openDropdown}>
                <MdPeopleAlt  />
              Staff
            </p>
            <ul className={`${dropdown && "dropDownActive"}`}>
              <li>
                <NavLink to="/StaffRecords" className="nav">
                    <FaTableList/>
                  Staff Records
                </NavLink>
              </li>
              <li>
                <NavLink to="/NewStaff" className="nav">
                <FaUserPlus/>
                  Add new staff
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="linksWrapper">
            <p onClick={openDropdown2}>
            <FaFolderOpen />
              Forms
            </p>
            <ul className={`${dropdown2 && "dropDownActive"}`}>
              <li>
                <NavLink to="/AllowanceForm" className="nav">
                    <FaFileCirclePlus/>
                  Allowance Form
                </NavLink>
              </li>
              <li>
                <NavLink to="/DeductionForm" className="nav">
                    <FaFileCircleMinus/>
                  Deduction Form
                </NavLink>
              </li>
              <li>
              <NavLink to="/ExpenseForm" className="nav">
            <IoNewspaper />
            Expense Form
          </NavLink>
              </li>
              <li>
                <NavLink to="/PaySlipForm" className="nav">
                <MdTableRows/>
                  Pay Slip
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/Products" className="nav">
            <FaDropbox />
            Products
          </NavLink>
          <NavLink to="/CustomerRecords" className="nav">
            <FaUsers />
            Our Customers
          </NavLink>
          <NavLink to="/CreateQuotation" className="nav">
            <FaFileAlt/>
            Generate Quotation
          </NavLink>
          <NavLink to="/CreateQuotation" className="nav">
            <FaFileAlt/>
            Invoice
          </NavLink>
          <NavLink to="/MakeSale" className="nav">
          <IoBagCheckSharp />
            Make sale
          </NavLink>
        </div>
      </aside>
  );
}

export default Sidebar;
