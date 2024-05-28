import "./Allowance.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import {server} from "../../server"

axios.defaults.withCredentials = true;

function Allowances() {

  const [formData, setFormData] = useState({
    idNo: "",
    month: "",
    year: "",
    arrears: "",
    house: "",
    imprestAmount: "",
    transport: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function changeValue(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const data = {
    id_no: formData.idNo,
    month: formData.month,
    year: formData.year,
    arrears: formData.arrears,
    house: formData.house,
    imprest_amount: formData.imprestAmount,
    transport: formData.transport,
  };
  const [error, setError] = useState(false);
  async function saveDetails(e) {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`${server}/api/allowance/new-allowance`, data, {
        headers: { authorization: "jwt " + sessionStorage.getItem("token") },
      })
      .then(() => {
        setSuccess(true);
        setFormData({
          idNo: "",
          month: "",
          year: "",
          arrears: "",
          house: "",
          imprestAmount: "",
          transport: "",
        });
      })
      .catch((error) => {
        if (error.response.status) {
          setError(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  }
  useEffect(() => {
    if (success) {
      toast.success("Saved successfully", {
        id: "allowanceSaved",
      });
    }
  }, [success]);

  return (
    <div className="formContainer">
          <h3 className="formTitle">Allowance Form</h3>
          <form className="form" onSubmit={saveDetails}>
            <div className="gridContent">
              <div>
                <label htmlFor="idNumber">ID No</label>
                <input
                  type="number"
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
                  value={formData.year}
                  id="year"
                  min="2024"
                  max="2025"
                  onChange={changeValue}
                />
              </div>
              <div>
                <label htmlFor="arrears">Arrears</label>
                <input
                  type="number"
                  name="arrears"
                  id="arrears"
                  min={0}
                  value={formData.arrears}
                  onChange={changeValue}
                />
              </div>
              <div>
                <label htmlFor="house">House</label>
                <input
                  type="number"
                  name="house"
                  id="house"
                  min={0}
                  value={formData.house}
                  onChange={changeValue}
                />
              </div>
              <div>
                <label htmlFor="imprestAmount">Imprest Amount</label>
                <input
                  type="number"
                  name="imprestAmount"
                  id="imprestAmount"
                  min={0}
                  value={formData.imprestAmount}
                  onChange={changeValue}
                />
              </div>
              <div>
                <label htmlFor="transport">Transport</label>
                <input
                  type="number"
                  name="transport"
                  id="transport"
                  min={0}
                  value={formData.transport}
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
          {error && <p>Some error occured</p>}
      </div>
  );
}

export default Allowances;
