import axios from "axios";
import UserTable from "../../components/Data Tables/UserTable";
import { useQuery } from "react-query";

function CustomerRecords() {

  const {data:cutomerRecords} = useQuery('cutomerRecords', ()=>{
    return axios.get("http://localhost:5000/api/customer/get-all-customers")
  }) 
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email Address',
      width: 200,
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Phone_no',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'contact_person',
      headerName: 'Contact_Person',
      width: 200,
      editable: true,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 150,
      editable: true,
    }
  ];
  const rows = cutomerRecords?.data?.customers.map((obj) => {
    return { ...obj, id: obj._id };
  });

 

  return (
    <div style={{ height: 350, width: "100%" }}>
      <UserTable rows={rows} columns={columns}/>
    </div>
  );
}

export default CustomerRecords;
