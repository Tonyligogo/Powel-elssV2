import { TfiFaceSad } from "react-icons/tfi";
import './Error.css'

function Error() {
  return (
    <div className="error">
    <TfiFaceSad style={{fontSize:'100px'}} />
    <h1 style={{fontSize:'48px'}}>404</h1>
    <h2 style={{fontSize:'36px'}}>Page not found!</h2>
    <p style={{fontSize:'20px'}}>The page you are looking for does not exist.</p>
    <button style={{marginTop:'20px'}} onClick={()=>window.history.back()}>Back</button>
    </div>
  )
}

export default Error