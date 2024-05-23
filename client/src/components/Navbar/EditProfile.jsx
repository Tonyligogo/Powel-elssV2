import "./EditProfile.css";
import { Icon } from '@iconify/react';
import { CiEdit } from "react-icons/ci";
import { useAuthContext } from "../../context/AuthProvider";

function EditProfile({onCloseProfileSettings}) {
    // this callback function >onCloseProfileSettings< sends state to Navbar to close profileSettings
    const { currentUser} = useAuthContext();
    
  return (
    <div>
      <div className="top">
        <div className="topLeft">
          <Icon icon="mingcute:user-4-fill" color="gray" width="50" />
          <p>
            <small style={{textTransform:'capitalize'}}>{currentUser}</small>
            <small style={{ color: "grey", fontSize: "12px" }}>
              Role @powel-elss.co
            </small>
          </p>
        </div>
        <div className="closeBtn" onClick={() => onCloseProfileSettings(false)}>
          <span>x</span>
        </div>
      </div>
      <p className="line"></p>
      <div className="bottom">
        <div className="value">
          <span>Username</span>
          <span style={{color: 'grey'}}>John doe <CiEdit className="editPen" /> </span>
        </div>
        <div className="value">
          <span>Email</span>
          <span style={{color: 'grey'}}>email@gmail.com <CiEdit className="editPen" /> </span>
        </div>
        <div className="value">
          <span>Password</span>
          <span style={{color: 'grey'}}>******** <CiEdit className="editPen" /> </span>
        </div>
        <button>Save Changes</button>
      </div>
    </div>
  );
}

export default EditProfile;
