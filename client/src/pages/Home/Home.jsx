import './Home.css'
import Widget from '../../components/Widgets/Widgets'
import BarChart from '../../components/Charts/BarChart'
// import UserTable from '../../components/Data Tables/UserTable'

function Home() {
  return (
    <div className='homeContainer'>
        <div className="widgets">
          <Widget type="sales"/>
          <Widget type="expenses"/>
          <div className='secondWidget'>
            <Widget type="services"/>
            <Widget type="serviceForm"/>
          </div>
        </div>
        <div className="bottom">
          <div className='chart'>
          <BarChart/>
          </div>
          <div className='asideBox'></div>
        </div>
    </div>
  )
}

export default Home