import { useState } from "react";
import "./QuotationTable.css";
import { MdDeleteOutline } from "react-icons/md";

function QuotationItems({onTableUpdate}) {
  const [items, setItems] = useState([]);
  const [addItem, setAddItem] = useState(false);
  // const [selectedData, setSelectedData] = useState('')
  const [itemType, setItemType] = useState('');
    
  const [inputValues, setInputValues] = useState({
    itemDescription: "",
    quantity: "",
    price: "",
    unit:""
  });

  // function handleSelect(e){
  //   setSelectedData(e.target.value);
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleAddItem = () => {
    const amount = inputValues.quantity * inputValues.price;
    setItems([...items, { ...inputValues, amount }]);
    onTableUpdate([...items, { ...inputValues, amount }]);
    setInputValues({
      itemName: '',
      quantity: '',
      price: '',
      unit: ''
    });
    setAddItem(false);
  };
  const handleCancel = () => {
    setInputValues({
      itemName: '',
      quantity: '',
      price: '',
      unit: ''
    });
    setAddItem(false);
  };
  const handleRemoveItem = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
    onTableUpdate(newItems);
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setItemType(selectedType);

    // if (selectedType === 'Service') {
    //   setItems([]);
    // }

    setInputValues({
      itemName: '',
      quantity: '',
      price: '',
      unit: ''
    });
  };

  // const handleSaveTableData = (e) => {
  //   e.preventDefault();
  //   onTableUpdate(items);
  // }

  return (
    <div>
        <div className="select">
              <label htmlFor="select" className="quotationLabel">Select quotation type</label>
              <select name="option" id="select" required className="quotationInput"  onChange={handleTypeChange}>
                <option value=''>--Select type--</option>
                <option value={itemType.option}>Service</option>
                <option value={itemType.option}>Supply</option>
                <option value={itemType.option}>Service and Supply</option>
              </select>
            </div>
      {items.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Quantity</th>
              <th>Unit price</th>
              <th>Total</th>
              {itemType !== 'Service' && <th>Unit</th>}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.amount}</td>
                {itemType !== 'Service' && <td>{item.unit}</td>}
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
      {itemType ?

      <>{items.length <= 0 || addItem ? <div>
        <form onSubmit={handleAddItem}>
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
            {(itemType === 'Supply' || itemType === 'Service and Supply') && (
              <div>
                <label htmlFor="unit" className="quotationLabel">
                  Unit
                </label>
                  <input
                    type="text"
                    name="unit"
                    id="unit"
                    className="quotationInput"
                    value={inputValues.unit}
                    onChange={handleChange}
                    required={itemType === 'Supply'}
                  />
              </div>
            )}
        </div>
        <div className="quotationActionBtns">
            <button type="button" onClick={handleCancel}>Cancel</button>
            <button type="submit">Add</button>
        </div>
        </form>
      </div>
      :
      <>
      <p onClick={()=>setAddItem(true)} className="addItem">+Add Item</p>
      </>
      }</>
      :null
      }
    </div>
  );
}

export default QuotationItems;
