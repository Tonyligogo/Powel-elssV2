import { useState, useRef, useEffect } from 'react';
import './CodeVerification.css'
import axios from 'axios';
import { server } from '../../server';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import Logo from '../../assets/logo.png'

const CodeVerification = ({token}) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate()

  // Focus the first input when the component mounts
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (index, value) => {
    // Allow only numeric input
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Shift focus to the next input if the current input is filled
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }

      // Handle backspace to focus the previous input
      if (!value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const codeString = code.join('');

    if (codeString.length !== 4) {
      alert('Code must be 4 digits long.');
      return;
    }

    try {
        const data={
            activation_token:token,
            activation_code:codeString
        }
        axios.post(`${server}/api/auth/user-activation`,data)
        .then(()=>{
            toast.success('Code verified successfully',{id:'success'});
            setCode(['', '', '', '']);
            inputRefs.current[0].focus();
            navigate('/AddUser',{replace:true})
        })
        .catch(()=>{
            toast.error('An error occurred during verification. Please try again.',{id:'error'});
        })
  }catch(error){
    toast.error('Unable to verify. Please try again.',{id:'failed'});
  }
}

  return (
    <div className="codeWrapper">
    <div className="codeVerification">
      <div className="codeVerificationTop">
        <h2>Powel-Elss</h2>
        <h2>Enter Verification Code</h2>
      </div>
      <p>We&apos;ve sent a verification code to the email you provided.</p>
      <form onSubmit={handleSubmit}>
        <div>
          {code.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              style={{ textAlign: 'center', marginRight: '0.5em' }}
            />
          ))}
        </div>
        <button type="submit">Verify Code</button>
      </form>
    </div>
    </div>
  );
};

export default CodeVerification;
