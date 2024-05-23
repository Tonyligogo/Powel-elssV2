import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useAuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [formValues, setFormValues] = useState({ email: "", password: "", confirmPassword: ""});
  const [, setUserFocus] = useState(false);
  const { setToken, setLoading, setUser, authenticated, loading } =
    useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    const data = {password: formValues.password, confirmPassword: formValues.confirmPassword};
    await axios.post(`${server}/api/auth/forgot-password/${formValues.email}`, data)
    .then((res) => {
      setToken(res.data.accessToken)
      setUser(res.data.user)
      setLoading(false)
      // navigate("/");
      window.location.href = "/"
      setFormValues({email:'',password:'',confirmPassword:''})
    })
    .catch((err) => {
      if(err.response?.status === 400){
          toast.error('Wrong email or password', {
            id: 'error',
        })
      }else{
        toast.error('Login failed. Try again!', {
          id: 'error',
      })
      }
      setLoading(false)
    })
  }

  return (
    <div className="loginPage">
      <div className="form">
        <h2 className="title">Forgot Password?</h2>
        <span>Enter your email address and new password below, and we&apos;ll send you a password reset OTP</span>
        <form onSubmit={handleLogin}>
          <div className="inputBox">
            <input
              className="input"
              id="email"
              type="email"
              placeholder="Email Address"
              value={formValues.email}
              ref={userRef}
              name="email"
              autoComplete="off"
              onFocus={() => setUserFocus(true)}
              required
              onChange={handleChange}
            />
          </div>
          <div style={{display:'flex', gap:'10px'}}>
            <div className="inputBox">
                <input
                className="input"
                type="password"
                id="password"
                placeholder="Pasword"
                value={formValues.password}
                name="password"
                required
                onChange={handleChange}
                ref={passwordRef}
                />
            </div>
            <div className="inputBox">
                <input
                className="input"
                id="confirmPassword"
                type="password"
                value={formValues.confirmPassword}
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                onChange={handleChange}
                ref={confirmPasswordRef}
                />
            </div>
          </div>
            <button className="signIn">{!loading ? 'Send Mail' : 'Sending mail...'}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
