import UserTable from '../../components/Data Tables/UserTable';
import './StaffRecords.css';
import axios from 'axios';
import { useQuery } from 'react-query';
function StaffRecords() {

  const {data:staffRecords} = useQuery('staffRecords', ()=>{
    return axios.get("http://localhost:5000/api/staff/get-all-staff-data")
  })

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      valueGetter: (value, row) => `${row.first_name || ''} ${row.surname || ''}`,
    },
    {
      field: 'phone_no',
      headerName: 'Phone_no',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'id_no',
      headerName: 'ID_no',
      width: 110,
      editable: true,
    },
    {
      field: 'job_title',
      headerName: 'Job title',
      width: 200,
      editable: true,
    },
    {
      field: 'P_no',
      headerName: 'P_no',
      type: 'number',
      width: 80,
      editable: true,
    }
  ];
  const rows = staffRecords?.data?.staff_data.map((obj) => {
    return { ...obj, id: obj._id };
  });

  return (
    <div style={{ height: 350, width: '100%' }}>
        <UserTable rows={rows} columns={columns}/>
    </div>
  )
}

export default StaffRecords