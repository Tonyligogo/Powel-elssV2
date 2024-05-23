import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
// import './UpdatePassword.css'
function UpdatePassword() {

    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newpasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const[loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

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

    const updatePassword = async(e)=>{
        e.preventDefault();
        setLoading(true)
        const data = {oldPassword, newPassword}
        await axios.put("http://localhost:5000/api/auth/update-password",data)
        .then(()=>{
            setLoading(false)
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            toast.success('Avatar successfully changed', {
                id: 'success',
            })
        })
        .catch((err)=>{
            if(err.response.status === 400){
            toast.error(err.response.data.message, {
                id: 'error400',
            })}
            else if(err.response.status === 403){
            toast.error(err.response.data.message, {
                id: 'error403',
            })}
            else if(err.response.status === 409){
            toast.error(err.response.data.message, {
                id: 'error409',
            })}
            else{
            toast.error('An error occured. Try again later!', {
                id: 'error409',
            })}
            setLoading(false)
        })
      }
  return (
    <div className='rightSide'>
                <div>
                    <label htmlFor="oldPassword" className="quotationLabel">Current Password</label>
                    <input type="password" className="quotationInput" name="oldPassword" id="oldPassword" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                </div>
                <div className='rightSidePasswords'>
                    <div>
                        <label htmlFor="newPassword" className="quotationLabel">New Password</label>
                        <input type="password" className="quotationInput" name="newPassword" id="newPassword" value={newPassword} onChange={handlePasswordChange}/>
                        {newpasswordError && <p style={{ color: 'red' }}>{newpasswordError}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="quotationLabel">Confirm Password</label>
                        <input type="password" className="quotationInput" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                        {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
                    </div>
                </div>
                <div>

                <button onClick={updatePassword} disabled={!isValid} >{!loading ? 'Update Password' : 'Updating password...'}</button>
                </div>
            </div>
  )
}

export default UpdatePassword