
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { server } from '../../server';
import toast from 'react-hot-toast';

const CodeVerification = ({token}) => {
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const inputRefs = useRef([]); // Array of refs for each input field
  
    const handleInputChange = (event, index) => {
      const newCode = code.split(''); // Convert code to array
      newCode[index] = event.target.value;
      setCode(newCode.join('')); // Update code with new value
      
      // Focus next input if not the last one and value entered
      if (index < code.length - 1 && event.target.value) {
        inputRefs.current[index + 1].focus();
      }
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code.length !== 4) {
      setErrorMessage('Please enter a 4-digit code');
      return;
    }
    const data={
        activation_token:token,
        activation_code:code
    }
    console.log(data, 'mydata')
    axios.post(`${server}/api/auth/user-activation`,data)
    .then((res)=>{
        console.log(res);
        toast.success('Account successfully created',{id:'success'});
    })
    .catch((err)=>{
        console.log(err);
        toast.error('There was an error activating your account',{id:'error'});
    })
  };

  useEffect(() => {
    // Focus the first input on initial render
    inputRefs.current[0].focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {[...Array(4)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={code[index] || ''}
            onChange={(e) => handleInputChange(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit">Verify Code</button>
    </form>
  );
};

export default CodeVerification;
