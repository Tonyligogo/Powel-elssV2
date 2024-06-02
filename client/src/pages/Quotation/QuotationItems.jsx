import { useState } from "react";
import "./QuotationTable.css";
import { MdDeleteOutline } from "react-icons/md";

function QuotationItems() {
  const [items, setItems] = useState([]);
  const [addItem, setAddItem] = useState(false);
  const [selectedData, setSelectedData] = useState('')
    
  const [inputValues, setInputValues] = useState({
    itemName: "",
    quantity: "",
    price: "",
  });

  function handleSelect(e){
    setSelectedData(e.target.value);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleAddItem = () => {
    const finalAmount = inputValues.quantity * inputValues.price;
    setItems([...items, { ...inputValues, finalAmount }]);
    setInputValues({
      itemName: "",
      quantity: "",
      price: "",
    });
    setAddItem(false);
  };
  const handleCancel = () => {
    setInputValues({
      itemName: "",
      quantity: "",
      price: "",
    });
    setAddItem(false);
  };
  const handleRemoveItem = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div>
        <div className="select">
              <label htmlFor="select" className="quotationLabel">Select quotation type</label>
              <select name="option" id="select" required className="quotationInput"  onChange={handleSelect}>
                <option value=''>--Select type--</option>
                <option value={selectedData.option}>Service</option>
                <option value={selectedData.option}>Supply</option>
                <option value={selectedData.option}>Service and Supply</option>
              </select>
            </div>
      {items.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.finalAmount}</td>
                <td>
                  <MdDeleteOutline
                    onClick={() => handleRemoveItem(index)}
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                      color: "#d74221",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {items.length <= 0 || addItem ? <div>
        <div className="quotationItems">
            <div>
            <label htmlFor="itemName" className="quotationLabel">
                Item Name
            </label>
            <input
                type="text"
                id="itemName"
                name="itemName"
                value={inputValues.itemName}
                onChange={handleChange}
                required
                className="quotationInput"
            />
            </div>
            <div>
            <label htmlFor="itemQuantity" className="quotationLabel">
                Item Quantity
            </label>
            <input
                type="number"
                id="itemQuantity"
                name="quantity"
                value={inputValues.quantity}
                onChange={handleChange}
                required
                className="quotationInput"
            />
            </div>
            <div>
            <label htmlFor="itemAmount" className="quotationLabel">
                Item Amount
            </label>
            <input
                type="number"
                id="itemAmount"
                name="price"
                value={inputValues.price}
                onChange={handleChange}
                required
                className="quotationInput"
            />
            </div>
        </div>
        <div className="quotationActionBtns">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleAddItem}>Add</button>
        </div>
      </div>
      :
      <p onClick={()=>setAddItem(true)} className="addItem">+Add Item</p>
      }
    </div>
  );
}

export default QuotationItems;
