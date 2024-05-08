import { Outlet } from "react-router-dom" 
import './Layout.css'
import Sidebar from "../components/Sidebar/Sidebar"
import Navbar from "../components/Navbar/Navbar"
import { useState } from "react"

function Layout() {

  const [resizeTrue, setResizeTrue] = useState(false)

  return (
    <main className="mainLayout">
        <div className={`mainSidebar ${resizeTrue ? "hide":"show" } `}>
          {/* <span className="resizeBtn"  onClick={()=>setResizeTrue(prev => !prev)}>Resize</span> */}
          <Sidebar/>
        </div>
        <div className="content">
            <Navbar/>
            <div className="mainContent">
              <Outlet/>
            </div>
        </div>
    </main>
  )
}

export default Layout