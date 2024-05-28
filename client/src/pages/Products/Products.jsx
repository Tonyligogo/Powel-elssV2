import axios from "axios";
import UserTable from "../../components/Data Tables/UserTable"
import { useQuery } from "react-query";
import { server } from "../../server";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import toast from "react-hot-toast";

function Products() {
  const [open, setOpen] = useState(false);

  const {data:products, refetch} = useQuery('staffRecords', ()=>{
    return axios.get(`${server}/api/item/get-all-items`)
  });

  const deleteItem = (itemId) => {
    axios.delete(`${server}/api/item/delete-item/${itemId}`)
   .then(()=>{
     toast.success('Item deleted successfully',{id:'success'})
     refetch()
   })
   .catch(()=>{
    toast.error('Failed to delete item',{id:'error'})
   });
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Product name',
      description: 'This column has a value getter and is not sortable.',
      width: 200,
    },
    {
      field: 'desc',
      headerName: 'Description',
      type: 'text',
      width: 250,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 100,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 80,
    }
  ];

  const rows = products?.data?.items.map((obj) => {
    return { ...obj, id: obj._id };
  });

  return (
    <div style={{ height: '100%', width: '100%', position:'relative'}}>
      <button onClick={()=>setOpen(true)} style={{marginBlockEnd:'10px'}}>+ Add product</button>
        <UserTable rows={rows} columns={columns} onDelete={deleteItem}/>
        {open && <Modal setOpen={setOpen} columns={columns} refetch={refetch} /> }
    </div>
  )
}

export default Products