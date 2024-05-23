import { useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";

function NewCustomer() {

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        contact_person: "",
        phone:""
    })
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        const userData = {
            name:formData.name,
            address:formData.address,
            email:formData.email,
            contact_person:formData.contact_person,
            phone:formData.phone
        }
        await axios.post("http://localhost:5000/api/customer/new-customer", userData)
        .then(()=>{
            toast.success('New customer added successfully',{
                id:'new-customer'
            })
            setFormData({
                name: "",
                address: "",
                email: "",
                contact_person: "",
                phone:""
            })
        })
        .catch((error)=>{
            if(error.response){
                console.log(error.response);
            }else if(error.request){
                console.log('network error')
            }else{
                console.log(error)
            }
        }).finally(() => {
            setLoading(false);
          });  
    }

  return (
    <div className='formContainer'>
                <h3 className="formTitle">Add New Customer</h3>
                <form className="form" onSubmit={handleSubmit}>
                <div className="gridContent">
                    <div>
                        <label>Customer Name</label>
                        <input type="text" value={formData.name} name='name' required onChange={changeValue} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" value={formData.email} name='email' required onChange={changeValue}/>
                    </div>
                    <div>
                        <label>Address</label>
                        <input type="text" value={formData.address} name='address' required onChange={changeValue}/>
                    </div>
                    <div>
                        <label>Contact Person</label>
                        <input type="text" value={formData.contact_person}  name='contact_person' required onChange={changeValue}/>
                    </div>
                    <div>
                        <label>Phone number</label>
                        <input type="number" value={formData.phone}  name='phone' required onChange={changeValue}/>
                    </div>
                </div>
                      <button type='submit' > {!loading ? 'Save' : 'Saving...'}</button>
                </form>
            </div>
  )
}

export default NewCustomer