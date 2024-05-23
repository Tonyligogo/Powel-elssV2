import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, PointElement, LineElement, Legend} from "chart.js"
import {Bar} from "react-chartjs-2"
import './BarChart.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
)

function BarChart({expenses, sales}) {
  
  function getDayOfWeek(dateString) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  }

  const salesByDayOfWeek = {};
  sales?.data?.orders?.forEach(order => {
    const dayOfWeek = getDayOfWeek(order.createdAt);
    const totalSales = order?.product_details?.totalPrice
    if (!salesByDayOfWeek[dayOfWeek]) {
      salesByDayOfWeek[dayOfWeek] = totalSales;
    }else{
      salesByDayOfWeek[dayOfWeek] += totalSales
    }
});

  const expensesByDayOfWeek = {};
  expenses?.data?.expenses?.forEach(expense => {
  const dayOfWeek = getDayOfWeek(expense.createdAt);
  const totalExpenses = expense?.total_cost
  if (!expensesByDayOfWeek[dayOfWeek]) {
    expensesByDayOfWeek[dayOfWeek] = totalExpenses;
  }
  expensesByDayOfWeek[dayOfWeek] += totalExpenses;
});

const predefinedDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
// const salesData = predefinedDayNames.map(dayName => salesByDayOfWeek[dayName] || 0);
// const expensesData = predefinedDayNames.map(dayName => expensesByDayOfWeek[dayName] || 0);


  var data = {
    labels: predefinedDayNames,
    datasets: [{
      label: 'Sales',
      data:[150, 250, 350, 450, 750],
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgb(255, 159, 64)',
      borderWidth: 1,
    }
    ,{
      label: 'Expenses',
      data:[0, 350, 150, 750, 1050],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1,
    }
  ]
  };
  var options = {
    maintainAspectRatio:false,
    scales:{
      y:{
        beginAtZero: true,
      }
    },
    plugins: {
      tooltip: {
        yAlign: 'bottom'
      },
      title: {
        display: true,
        text: 'Weekly sales against expenses',
        padding: {
            top: 10,
            bottom: 30
        }
    }
    }
  }

  return (
    <div className='chartBox'>
      <Bar
        data={data}
        options={options}
      />
    </div>
  )
}

export default BarChart