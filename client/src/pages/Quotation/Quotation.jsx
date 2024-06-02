import "./Quotation.css";
import QuotationItems from "./QuotationItems";

function Quotation() {
  return (
    <div className="quotationWrapper">
      <div className="quotationHeader">
        <span>Create Quotation</span>
      </div>
      <div className="quotationBody">
        <div className="one">
          <div>
            <label htmlFor="" className="quotationLabel">
            Quotation Number
            </label>
            <input type="text" className="quotationInput" />
          </div>
          <div>
            <label htmlFor="clientList" className="quotationLabel">
              Select Client
            </label>
            <div className="customSelect">
            <input list="clients" id="clientList" type="text" className="quotationInput clientList" />
            </div>
            <datalist id="clients">
                <option value="Tony Ligogo"></option>
                <option value="Peter Omollo"></option>
                <option value="Thomas Aggrey"></option>
                <option value="Tom Brady"></option>
                <option value="Pablo Escobar"></option>
            </datalist>
          </div>
        </div>
        <div className="two">
          <div>
            <label htmlFor="" className="quotationLabel">
              Client Name
            </label>
            <input type="text" className="quotationInput" placeholder='John Doe'/>
          </div>
          <div>
            <label htmlFor="" className="quotationLabel">
              Client Email
            </label>
            <input type="text" className="quotationInput" placeholder='johndoe@gmail.com'/>
          </div>
          <div>
            <label htmlFor="" className="quotationLabel">
              Client Contact Number
            </label>
            <input type="text" className="quotationInput" placeholder='0700001111'/>
          </div>
          <div>
            <label htmlFor="" className="quotationLabel">
              Client Address
            </label>
            <input type="text" className="quotationInput" placeholder='Enter address'/>
          </div>
        </div>
        <div className="three">
          <div>
            <label htmlFor="date" className="quotationLabel">
            Quotation Date
            </label>
            <input type="date" id="date" className="quotationInput" />
          </div>
          <div>
            <label htmlFor="dueDate" className="quotationLabel">
            Quotation Due Date
            </label>
            <input type="date" id="dueDate" className="quotationInput" />
          </div>
        </div>
        <div className="four">
            <QuotationItems/>
        </div>
        <div className="five">
          <p>Subtotal: <span>1000</span> </p>
          <p>Tax(10%): <span>100</span> </p>
          <p>Discount(5%): <span>50</span> </p>
          <p>Total: <span>950</span> </p>
        </div>
        <div className="six">
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Quotation;
