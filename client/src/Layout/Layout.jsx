import { Outlet } from "react-router-dom" 
import './Layout.css'
import Sidebar from "../components/Sidebar/Sidebar"
import Navbar from "../components/Navbar/Navbar"
import { useAuthContext } from "../context/AuthProvider"

function Layout() {

  const {menuActive} = useAuthContext();

  return (
    <main className="mainLayout">
        <div className={`mainSidebar ${menuActive ? null : 'hideMenu'}`}>
          <Sidebar/>
        </div>
        <div className={`content ${menuActive ? null : 'fullWidth'}`}>
            <Navbar/>
            <div className="mainContent">
              <Outlet/>
            </div>
        </div>
    </main>
  )
}

export default Layout