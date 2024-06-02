import { useEffect, useState } from 'react';
import { FaRegUser } from "react-icons/fa6";
import { Icon } from "@iconify/react";
import axios from 'axios';
import toast from 'react-hot-toast';
import {server} from '../../server';
import CodeVerification from '../../components/CodeVerification/CodeVerification';
import { useAuthContext } from '../../context/AuthProvider';
function AddUser() {
  const {role, loading:contextLoading} = useAuthContext()
    useEffect(()=>{
      if(!contextLoading && role.toLowerCase() !== 'admin'){
        window.history.back()
      }
    },[contextLoading, role])
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState('');
    const [filePreview, setFilePreview] = useState(null);

    const[userCreated, setUserCreated] = useState(false);
    const[token, setToken] = useState(false);
    // password validation
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newpasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isValid, setIsValid] = useState(false);


    const convertBase64 = (file)=>{
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

      function handleAvatarChange(e){
        setFile(e.target.files)
        setFilePreview(URL.createObjectURL(e.target.files[0]))
      }

    //   password validation

  // Password regex pattern (example: minimum 8 characters, at least one letter and one number)
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const validatePassword = (newPassword) => {
    if (!passwordPattern.test(newPassword)) {
      setNewPasswordError('Password must be at least 8 characters long and contain both letters and numbers.');
      setIsValid(false);
    } else {
      setNewPasswordError('');
    }
  };

  const validateConfirmPassword = (newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      setIsValid(false);
    } else {
      setConfirmPasswordError('');
      if (passwordPattern.test(newPassword)) {
        setIsValid(true);
      }
    }
  };

  const handlePasswordChange = (event) => {
    const theNewPassword = event.target.value;
    setNewPassword(theNewPassword);
    validatePassword(theNewPassword);
    validateConfirmPassword(theNewPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    validateConfirmPassword(newPassword, newConfirmPassword);
  };
//   end of password validation

      const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true)
        const imageFile = file[0];
        const base64 = imageFile !== undefined ? await convertBase64(imageFile) : undefined;
        setFilePreview(null);
        const data = {
          username: userName,
          email: email,
          phone: number,
          password:  newPassword,
          ...(base64 !== undefined && { avatar: base64 })
        }
        await axios.post(`${server}/api/auth/register`,data)
        .then((res)=>{
            toast.success('User successfully created', {
                id: 'success',
            })
            setToken(res.data.activationToken)
            setUserCreated(true)
            setLoading(false)
            setUserName('');
            setEmail('');
            setFile('');
            setConfirmPassword('');
            setNewPassword('');
        })
        .catch((err)=>{
            toast.error(err?.response?.data?.message, {
                id: 'error',
            })
            setLoading(false)
        })
      }
       
  return (
    <>
    {!userCreated ?<div className='editProfileWrapper'>
        <div className="editProfileTop">
            <span>New System User</span>
        </div>
         <div className="editProfileBottom">
            <div className='editProfileAside'>
                <div className='editProfileTab active'>
                <FaRegUser />
                    <span>
                        <small>Add User</small>
                        <small>Profile Information</small>
                    </span>
                </div>
            </div>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <div className='rightSide'>
                    <div className='profilePicWrapper'>
                        <Icon icon="mingcute:user-4-fill" width="60" color='gray'/>
                        <div className='profileUpload'>
                            <input style={{ display: "none" }} type="file" id="file" onChange={handleAvatarChange}/>
                            <label htmlFor="file" >
                                <span style={{ cursor: "pointer" }}>Choose profile photo</span>
                            </label>
                            {filePreview !== null && <img src={filePreview} alt="Preview" className='previewPic' /> }
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="username" className="quotationLabel">Username</label>
                                <input type="text" id='username' name='username' onChange={(e)=>setUserName(e.target.value)} value={userName} autoComplete='new' className="quotationInput editProfileInput" />
                            
                        </div>
                        <div>
                            <label htmlFor="email" className="quotationLabel">Email</label>
                                <input type="email" id='email' name='email' onChange={(e)=>setEmail(e.target.value)} value={email} className="quotationInput editProfileInput" />
                            
                        </div>
                        <div>
                            <label htmlFor="number" className="quotationLabel">Phone Number</label>
                                <input type="number" id='number' name='number' onChange={(e)=>setNumber(e.target.value)} value={number} className="quotationInput editProfileInput" />
                            
                        </div>
                        <div className='rightSidePasswords'>
                        <div>
                            <label htmlFor="newPassword" className="quotationLabel">New Password</label>
                            <input type="password" className="quotationInput" name="newPassword" id="newPassword" autoComplete='new-password' value={newPassword} onChange={handlePasswordChange}/>
                            {newpasswordError && <p style={{ color: 'red' }}>{newpasswordError}</p>}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="quotationLabel">Confirm Password</label>
                            <input type="password" className="quotationInput" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                            {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
                        </div>
                    </div>
                    </div>
                </div>
                <button type='submit' disabled={!isValid} style={{margin:'16px'}} >{!loading ? 'Create User' : 'Creating user...'}</button>
            </form>
        </div>
        </div>
        :
        <CodeVerification token={token} />
      }
      </>
  )
}

export default AddUser