import { useState } from 'react';
import './EditProfile.css'
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineVpnKey } from "react-icons/md";
import ProfilePic from '../../assets/ProfilePic.jpg'
import axios from 'axios';
import { useAuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
import { FaRegImage } from "react-icons/fa6";
import UpdatePassword from './UpdatePassword';
function EditProfile() {

    const [activeComponent, setActiveComponent] = useState('UserProfile');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState('');
    const [filePreview, setFilePreview] = useState(null);

    const { currentUser, userEmail, userNumber, setUser, avatar } = useAuthContext();

    const handleButtonClick = (componentName) => {
      setActiveComponent(componentName);
    };

    const convertBase64 = (file)=>{
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

      const updateUsername = async(e)=>{
        e.preventDefault();
        setLoading(true)
        const data ={username:userName}
        await axios.put("http://localhost:5000/api/auth/update-info",data)
        .then((res)=>{
            setUser(res.data.user)
            setUserName('')
            setLoading(false)
            toast.success('Username successfully changed', {
                id: 'success',
            })
        })
        .catch(()=>{
            toast.error('A user with this username already exists', {
                id: 'error',
            })
            setLoading(false)
        })
      }
      function handleAvatarChange(e){
        setFile(e.target.files)
        setFilePreview(URL.createObjectURL(e.target.files[0]))
      }
      const updateAvatar = async(e)=>{
        e.preventDefault();
        setFilePreview(null);
        setUploading(true)
        const imageFile = file[0];
        const base64 = await convertBase64(imageFile);
        const data = new FormData();
        data.set('avatar', base64);
        await axios.put("http://localhost:5000/api/auth/update-profile-pic",{avatar:base64})
        .then((res)=>{
            setUser(res.data.user)
            setUploading(false)
            toast.success('Avatar successfully changed', {
                id: 'success',
            })
        })
        .catch(()=>{
            toast.error('Failed to update', {
                id: 'error',
            })
            setLoading(false)
        })
      }
       

  return (
    <div className='editProfileWrapper'>
        <div className="editProfileTop">
            <span>Account Settings</span>
        </div>
        <div className="editProfileBottom">
            <div className='editProfileAside'>
                <div className={`editProfileTab ${activeComponent === 'UserProfile' ? 'active' : null}`} onClick={()=>handleButtonClick('UserProfile')}>
                <FaRegUser />
                    <span>
                        <small>User Profile</small>
                        <small>Profile Settings</small>
                    </span>
                </div>
                <div className={`editProfileTab ${activeComponent === 'Password' ? 'active' : null}`} onClick={()=>handleButtonClick('Password')}>
                <MdOutlineVpnKey />
                    <span>
                        <small>Change Password</small>
                        <small>Update Profile Security</small>
                    </span>
                </div>
            </div>
            { activeComponent === 'UserProfile' ? 
            <div className='rightSide'>
                <div className='profilePicWrapper'>
                    {!avatar ? <img src={ProfilePic} alt="Profile Pic" className='profilePic'/>
                    :
                    <img src={avatar} alt="Profile Pic" className='profilePic'/>}
                    <div className='profileUpload'>
                        <input style={{ display: "none" }} type="file" id="file" onChange={handleAvatarChange}/>
                        <label htmlFor="file" style={{display:'flex', alignItems:'center', gap:'10px'}}>
                            <FaRegImage />
                            <span>Choose profile photo</span>
                        </label>
                        {filePreview !== null && <img src={filePreview} alt="Preview" className='previewPic' /> }
                        <button onClick={updateAvatar}>{!uploading ? 'Upload' : 'Uploading...'}</button>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="username" className="quotationLabel">Username</label>
                        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                            <input type="text" id='username' name='username' onChange={(e)=>setUserName(e.target.value)} value={userName} className="quotationInput editProfileInput" placeholder={currentUser}/>
                            <button onClick={updateUsername} disabled={userName.trim() === ''}>{!loading ? 'Update' : 'Updating username...'}</button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="quotationLabel">Email</label>
                        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                            <input type="email" id='email' name='email' onChange={(e)=>setEmail(e.target.value)} value={email} className="quotationInput editProfileInput" placeholder={userEmail}/>
                            {/* <button onClick={updateEmail} disabled={email.trim() === '' || usernameLoading || numberLoading}>{!emailLoading ? 'Update' : 'Updating email...' }</button> */}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="number" className="quotationLabel">Phone Number</label>
                        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                            <input type="number" id='number' name='number' onChange={(e)=>setNumber(e.target.value)} value={number} className="quotationInput editProfileInput" placeholder={userNumber}/>
                            {/* <button onClick={updateNumber} disabled={number.trim() === '' || emailLoading || usernameLoading}>{!numberLoading ? 'Update' : 'Updating number...' }</button> */}
                        </div>
                    </div>
                </div>
            </div>
            :
            <UpdatePassword/>
            }
        </div>
    </div>
  )
}

export default EditProfile