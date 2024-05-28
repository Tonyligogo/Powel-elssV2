import "./Deduction.css";
import { useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { server } from "../../server";

axios.defaults.withCredentials = true;

function Deduction() {
  const [formData, setFormData] = useState({
    idNo: "",
    month: "",
    year: "",
    nhifNumber: "",
    nssfNumber: "",
    advances: "",
    taxes: "",
  });
  function changeValue(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const data = {
    id_no: formData.idNo,
    month: formData.month,
    year: formData.year,
    nhif: formData.nhifNumber,
    nssf: formData.nssfNumber,
    advances: formData.advances,
    taxes: formData.taxes,
  };
  const [loading, setLoading] = useState(false);
  async function saveDetails(e) {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`${server}/api/deduction/new-deduction`, data)
      .then(() => {
        toast.success("Saved successfully", {
          id: "deductionSaved",
        });
        setFormData({
          idNo: "",
          month: "",
          year: "",
          nhifNumber: "",
          nssfNumber: "",
          advances: "",
          taxes: "",
        });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          toast.success("Please provide all the required information", {
            id: "error422",
          });
        } else if (error.response.status === 409){
          toast.success("There is no staff member with the specified id number", {
            id: "error422",
          });
        }
        else {
          toast.success("An error occured. Refresh the page and try again.", {
            id: "error500",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="formContainer">
          <h3 className="formTitle">Deduction Form</h3>
          <form className="form" onSubmit={saveDetails}>
            <div className="gridContent">
              <div>
                <label htmlFor="idNumber">ID No</label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNo"
                  value={formData.idNo}
                  onChange={changeValue}
                />
              </div>
              <div>
                <label htmlFor="month">Month</label>
                <select
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={changeValue}
                >
                  <option value="">--Select Month--</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
              <div>
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  name="year"
                  id="year"
                  min="2023"
                  max="2050"
                  value={formData.year}
                  onChange={changeValue}
                />
              </div>
              <div>
                <label htmlFor="NHIFnumber">NHIF</label>
                <input
                  type="number"
                  name="nhifNumber"
                  id="NHIFnumber"
                  value={formData.nhifNumber}
                  onChange={changeValue}
                />
              </div>
              <div>
                <label htmlFor="nssfNumber">Nssf</label>
                <input
                  type="number"
                  name="nssfNumber"
                  id="nssfNumber"
                  value={formData.nssfNumber}
                  onChange={changeValue}
                />
              </div>
              <div>
                <label htmlFor="advances">Advances</label>
                <input
                  type="number"
                  name="advances"
                  id="advances"
                  value={formData.advances}
                  onChange={changeValue}
                />
              </div>
              <div>
                <label htmlFor="taxes">Taxes</label>
                <input
                  type="number"
                  name="taxes"
                  id="taxes"
                  value={formData.taxes}
                  onChange={changeValue}
                />
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

export default Deduction;
