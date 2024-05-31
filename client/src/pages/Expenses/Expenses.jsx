import "./Expenses.css";
import axios from "axios";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { server } from "../../server";
import { useQuery } from "react-query";
axios.defaults.withCredentials = true;

function Expenses() {

  const {data:count, refetch} = useQuery('count', ()=>{
    return axios.get(`${server}/api/expense/get-count`)
  });

  const [formData, setFormData] = useState({
    code: "",
    service: "",
    cost: "",
    recordedBy: "",
    date: "",
  });
  function changeValue(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const invCode = 'Exp-'+count?.data?.count;
  const currentDate = new Date().toLocaleDateString();
  const data = {
    code: invCode,
    service_item_name: formData.service,
    total_cost: formData.cost,
    recorded_by: formData.recordedBy,
    date: currentDate,
    count: count?.data?.count
  };
  const [loading, setLoading] = useState(false);
  async function saveDetails(e) {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`${server}/api/expense/new-expense`, data)
      .then(() => {
        toast.success("Expense saved successfully", {
          id: "expenseSaved",
        });
        setFormData({
          code: "",
          service: "",
          cost: "",
          recordedBy: "",
          date: "",
        });
        refetch()
      })
      .catch(() => {
        toast.success("An error occured while attempting to save expense", {
          id: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="formContainer">
          <h3 className="formTitle">Expenses Form</h3>
          <form onSubmit={saveDetails} className="form">
            <div className="gridContent">
              <div>
                <label>Service/ Item name</label>
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={changeValue}
                />
              </div>
              <div>
                <label>Total Cost</label>
                <input
                  type="text"
                  name="cost"
                  value={formData.cost}
                  onChange={changeValue}
                />
              </div>
              <div>
                <label>Recorded by</label>
                <input
                  type="text"
                  name="recordedBy"
                  value={formData.recordedBy}
                  onChange={changeValue}
                />
              </div>
              <div>
                <label>Date: </label>
                <label className="outputField">{currentDate}</label>
              </div>
              <div>
                <label>Code: </label>
                <label className="outputField">{invCode}</label>
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

export default Expenses;
