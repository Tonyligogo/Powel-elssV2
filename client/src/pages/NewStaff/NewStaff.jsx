import { useEffect, useState } from "react";
import "./NewStaff.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";

function NewUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNo: "",
    phoneNumber: "",
    basicSalary: "",
    jobTitle: "",
    option: "",
  });
  const [userCreated, setUserCreated] = useState(false);
  function changeValue(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function addStaff(e) {
    e.preventDefault();
    setLoading(true);
    const userData = {
      first_name: formData.firstName,
      surname: formData.lastName,
      id_no: formData.idNo,
      phone_no: formData.phoneNumber,
      basic_salary: formData.basicSalary,
      job_title: formData.jobTitle,
      P_no: formData.option,
    };
    await axios
      .post("http://localhost:5000/api/staff/new-employee", userData )
      .then(() => {
        toast.success("Saved successfully", {
          id: "userCreated",
        });
        setFormData({
          firstName: "",
          lastName: "",
          idNo: "",
          phoneNumber: "",
          basicSalary: "",
          jobTitle: "",
          option: "",
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="formContainer">
      <h3 className="formTitle">New Staff</h3>
      <form onSubmit={addStaff} className="form">
        <div className="gridContent">
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={formData.firstName}
              name="firstName"
              required
              onChange={changeValue}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              name="lastName"
              required
              onChange={changeValue}
            />
          </div>
          <div>
            <label>ID number</label>
            <input
              type="number"
              value={formData.idNo}
              name="idNo"
              required
              onChange={changeValue}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              value={formData.phoneNumber}
              max="10"
              min="10"
              name="phoneNumber"
              required
              onChange={changeValue}
            />
          </div>
          <div>
            <label>Basic Salary</label>
            <input
              type="number"
              value={formData.basicSalary}
              name="basicSalary"
              required
              onChange={changeValue}
            />
          </div>
          <div>
            <label>Job Title</label>
            <input
              type="text"
              value={formData.jobTitle}
              name="jobTitle"
              required
              onChange={changeValue}
            />
          </div>
          <div>
            <label id="PNo">P/No</label>
            <select
              id="PNo"
              name="option"
              value={formData.option}
              required
              onChange={changeValue}
            >
              <option>-- Select P/No --</option>
              <option>PE-01</option>
              <option>PE-02</option>
              <option>PE-03</option>
              <option>PE-04</option>
              <option>PE-05</option>
              <option>PE-06</option>
              <option>PE-07</option>
              <option>PE-08</option>
              <option>PE-09</option>
              <option>PE-10</option>
            </select>
          </div>
        </div>
        {loading ? (
          <button>
            <CircularProgress size="14px" className="progress" />
            Saving...
          </button>
        ) : (
          <button type="submit">Save</button>
        )}
      </form>
    </div>
  );
}

export default NewUser;
