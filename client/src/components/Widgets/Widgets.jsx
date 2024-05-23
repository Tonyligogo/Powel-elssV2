import './Widgets.css'
// import { Icon } from '@iconify/react';
// import {FaChartBar} from "react-icons/fa"
// import { Link } from 'react-router-dom'
import { GiTakeMyMoney } from "react-icons/gi";

function widgets({type}) {
let data;
switch(type){
  case "sales":
    data={
      top:"Sales",
    //   leftIcon: <FaChartBar/> ,
      iconBg: 'salesIconBg',
      link: "SalesSummary",
      iconColor: 'salesIconColor',
      bgColor:'purple'
    };
    break;
    case "expenses":
    data={
      top:"Expenses",
    //   leftIcon: <Icon icon="streamline:money-cash-bag-dollar-bag-payment-cash-money-finance" color="rgba(0, 0, 0, 0.60)" width="20" /> ,
      iconBg: 'expensesIconBg',
      link: "ExpensesSummary",
      iconColor: 'expensesIconColor',
      bgColor:'blue'
    };
    break;
    case "services":
    data={
      top:"Services",
    //   leftIcon: <Icon icon="medical-icon:i-social-services" color="rgba(0, 0, 0, 0.60)" width="20" /> ,
      iconBg: 'servicesIconBg',
      link: "ServicesSummary",
      iconColor: 'servicesIconColor',
      bgColor:'blue2'
    };
    break;
    case "serviceForm":
    data={
      top:"Service Form",
    //   leftIcon: <Icon icon="ant-design:form-outlined" width="20" />,
      iconBg: 'addUserIconBg',
      link: "ServiceForm",
      iconColor: 'addUserIconColor',
      bgColor:'white'
    };
    break;
    default:
      break;
}

  return (
    <div className={`widgetWrapper + ${data.bgColor} + ${type === 'services' || type === 'serviceForm' ? 'widgetWrapper2':null}`}>
      <span className='icon' > <GiTakeMyMoney style={{fontSize:'24px'}}/> </span>
      <div>
        <span className='amount'> Ksh.40,000</span>
        <small>Total Sales</small>
      </div>
    </div>
  )
}

export default widgets