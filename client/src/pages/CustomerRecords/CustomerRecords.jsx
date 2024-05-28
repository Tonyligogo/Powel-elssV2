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
    },
    {
      field: 'email',
      headerName: 'Email Address',
      width: 200,
    },
    {
      field: 'phone',
      headerName: 'Phone_no',
      type: 'number',
      width: 100,
    },
    {
      field: 'contact_person',
      headerName: 'Contact_Person',
      width: 200,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 150,
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
