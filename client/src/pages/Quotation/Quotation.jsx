import { useReducer, useState } from "react";
import "./Quotation.css";
import QuotationItems from "./QuotationItems";
import { useQuery } from "react-query";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "qtnNo":
      return {
       ...state,
        qtnNo: action.payload,
      };
    case "clientName":
      return {
       ...state,
        clientName: action.payload,
      };
    case "clientEmail":
      return {
       ...state,
        clientEmail: action.payload,
      };
    case "clientPhone":
      return {
       ...state,
        clientPhone: action.payload,
      };
    case "clientAddress":
      return {
       ...state,
        clientAddress: action.payload,
      };
    case "qtnDate":
      return {
       ...state,
        qtnDate: action.payload,
      };
    case "qtnDueDate":
      return {
       ...state,
        qtnDueDate: action.payload,
      };
    case "terms":
      return {
       ...state,
        terms: action.payload,
      };
    case "subTotal":
      return {
       ...state,
        subTotal: action.payload,
      };
    default: return {state}
  }
}

function Quotation() {

  const [selectedClient, setSelectedClient] = useState(null);

  const {data:customers, loading:fetchingcustomers} = useQuery('customers', ()=>{
    return axios.get("http://localhost:5000/api/customer/get-all-customers")
  }) 

  const initialState = {
    qtnNo:'',
    clientName:'',
    clientEmail:'',
    clientPhone:'',
    clientAddress:'',
    qtnDate:'',
    qtnDueDate:'',
    terms:'',
    subTotal:'',
  }
  const Actions = {
    qtnNo:'qtnNo',
    clientName:'clientName',
    clientEmail:'clientEmail',
    clientPhone:'clientPhone',
    clientAddress:'clientAddress',
    qtnDate:'qtnDate',
    qtnDueDate:'qtnDueDate',
    terms:'terms',
    subTotal:'subTotal',
  }
  const[state, dispatch] = useReducer(reducer, initialState)

  const [tableContent, setTableContent] = useState([]);

  const handleTableUpdate = (newTableContent) => {
    setTableContent(newTableContent);
  };

  const handleClientChange = (e) => {
    const customerId = e.target.value;
    const customer = customers?.data?.customers.find((customer) => customer._id === customerId);
    setSelectedClient(customer);
  };

  const totalAmount = tableContent.reduce((sum, item) => sum + item.amount, 0);
  const tax = totalAmount ? totalAmount * 0.1 : 0
  const discount = totalAmount ? totalAmount * 0.05 : 0
  const getAmountPayable = () => {
    return totalAmount + tax - discount;
  }; 

  const data ={
    qtnNo:state.qtnNo,
    clientName:state.clientName,
    clientEmail:state.clientEmail,
    clientPhone:state.clientPhone,
    clientAddress:state.clientAddress,
    qtnDate:state.qtnDate,
    qtnDueDate:state.qtnDueDate,
    terms:state.terms,
    subTotal:state.subTotal,
    items:tableContent
  }
  function sendData(e){
    e.preventDefault();
    console.log(data)
  }

  return (
    <div className="quotationWrapper">
      <div className="quotationHeader">
        <span>Create Quotation</span>
      </div>
      <div className="quotationBody">
        <div className="one">
          <div>
            <label htmlFor="qtnNo" className="quotationLabel">
            Quotation Number
            </label>
            <input type="text" id="qtnNo" className="quotationInput" value={state.qtnNo} onChange={(e)=>dispatch({type:Actions.qtnNo, payload:e.target.value })}/>
          </div>
          <div>
            <label htmlFor="clientList" className="quotationLabel">
              Select Client
            </label>
            <div className="customSelect">
            <select onChange={handleClientChange} defaultValue="">
        <option value="">
          Select a client
        </option>
        {!fetchingcustomers && customers?.data?.customers.length > 0 && customers?.data?.customers.map((user)=>(
                <option value={user._id} key={user._id} >{user.name}</option>
              ))}
      </select>
            </div>
            
          </div>
        </div>
        <div className="two">
          {!selectedClient ? 
          <div>
            <div>
              <label htmlFor="" className="quotationLabel">
                Client Name
              </label>
              <input type="text" className="quotationInput" placeholder='John Doe' value={state.clientName} onChange={(e)=>dispatch({type:Actions.clientName, payload:e.target.value })}/>
            </div>
            <div>
              <label htmlFor="" className="quotationLabel">
                Client Email
              </label>
              <input type="text" className="quotationInput" placeholder='johndoe@gmail.com' value={state.clientEmail} onChange={(e)=>dispatch({type:Actions.clientEmail, payload:e.target.value })}/>
            </div>
            <div>
              <label htmlFor="" className="quotationLabel">
                Client Contact Number
              </label>
              <input type="text" className="quotationInput" placeholder='0700001111' value={state.clientPhone} onChange={(e)=>dispatch({type:Actions.clientPhone, payload:e.target.value })}/>
            </div>
            <div>
              <label htmlFor="" className="quotationLabel">
                Client Address
              </label>
              <input type="text" className="quotationInput" placeholder='Enter address' value={state.clientAddress} onChange={(e)=>dispatch({type:Actions.clientAddress, payload:e.target.value })}/>
            </div>
          </div> 
          :
          <div>
            <div>
              <label className="quotationLabel">
                Client Name
              </label>
              <input className="quotationInput" value={selectedClient.name} readOnly/>
            </div>
            <div>
              <label className="quotationLabel">
                Client Email
              </label>
              <input className="quotationInput" value={selectedClient.email} readOnly/>
            </div>
            <div>
              <label className="quotationLabel">
                Client Contact Number
              </label>
              <input className="quotationInput" value={selectedClient.phone} readOnly/>
            </div>
            <div>
              <label className="quotationLabel">
                Client Address
              </label>
              <input className="quotationInput" value={selectedClient.address} readOnly/>
            </div>
          </div>}   
        </div>
        <div className="three">
          <div>
            <label htmlFor="date" className="quotationLabel">
            Quotation Date
            </label>
            <input type="date" id="date" className="quotationInput" value={state.qtnDate} onChange={(e)=>dispatch({type:Actions.qtnDate, payload:e.target.value })}/>
          </div>
          <div>
            <label htmlFor="dueDate" className="quotationLabel">
            Quotation Due Date
            </label>
            <input type="date" id="dueDate" className="quotationInput" value={state.qtnDueDate} onChange={(e)=>dispatch({type:Actions.qtnDueDate, payload:e.target.value })}/>
          </div>
          <div>
            <label htmlFor="terms" className="quotationLabel">
            Terms
            </label>
            <input type="text" id="terms" className="quotationInput" value={state.terms} onChange={(e)=>dispatch({type:Actions.terms, payload:e.target.value })}/>
          </div>
        </div>
        <div className="four">
            <QuotationItems onTableUpdate={handleTableUpdate}/>
        </div>
        <div className="five">
          <p>Subtotal: <span>Ksh{totalAmount ? totalAmount.toFixed(2) : 0}</span> </p>
          <p>Tax(10%): <span>Ksh{tax ? tax.toFixed(2) : 0}</span> </p>
          <p>Discount(5%): <span>Ksh{discount ? discount.toFixed(2) : 0}</span> </p>
          <p>Total: <span>Ksh{getAmountPayable().toFixed(2)}</span> </p>
        </div>
        <div className="six">
          <button onClick={sendData}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Quotation;
