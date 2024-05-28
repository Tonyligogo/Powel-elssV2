import axios from 'axios';
import './Modal.css'
import { useState } from 'react';
import toast from "react-hot-toast";
import { server } from '../../server';

 function Modal({setOpen, refetch}) {
    const [formData, setFormData] = useState({
        name:'',
        desc:'',
        category:'',
        price:''
    })
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const addProduct = async(e)=>{
        e.preventDefault()
        const userData = {
            name:formData.name,
            desc:formData.desc,
            category:formData.category,
            price:formData.price
        } 
        await axios.post(`${server}/api/item/new-item`, userData,{
            headers: {authorization: "jwt " + sessionStorage.getItem("token")}
          })
        .then(()=>{
            toast.success('New item added successfully',{id:'success'})
            refetch()
            setFormData({
                ...formData,
                name: '',
                desc: '',
                category: '',
                price: '',
              });
        })
        .catch((error)=>{
            console.log(error)
            if(error.response){
                toast.error('Failed to add item',{id:'responseError'})
            }else if(error.request){
                toast.error('Failed to add item due to network issues',{id:'badNetwork'})
            }else{
                toast.error('Failed to add item',{id:'error'})
            }
        })
    }

   return (
     <div className='modalWrapper'>
        <div className="modalContainer">
            <div className="modalTop">
                <h1>Add product</h1>
                <span className='closeBtn' onClick={()=>setOpen(false)}>x</span>
            </div>
            <form>
                    <div>
                        <label className='quotationLabel'>Name</label>
                        <input className='quotationInput' type="text" placeholder='Name' value={formData.name} name='name' required onChange={changeValue} />
                    </div>
                    <div>
                        <label className='quotationLabel'>Description</label>
                        <textarea className='quotationInput'  type="text" placeholder='Description' value={formData.desc} name='desc' required onChange={changeValue}></textarea>
                    </div>
                    <div>
                        <label className='quotationLabel'>Category</label>
                        <input className='quotationInput' type="text" placeholder='Category' value={formData.category} name='category' required onChange={changeValue}/>
                    </div>
                    <div>
                        <label className='quotationLabel'>Price</label>
                        <input className='quotationInput' type="text" placeholder='Price' value={formData.price} name='price' required onChange={changeValue}/>
                    </div>
                </form>
                <button onClick={addProduct}>Save</button>
        </div>
     </div>
   )
 }
 
 export default Modal