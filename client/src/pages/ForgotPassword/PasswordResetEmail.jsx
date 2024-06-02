import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useAuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";

axios.defaults.withCredentials = true;

function PasswordResetEmail() {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [, setUserFocus] = useState(false);
  const { setLoading, authenticated, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);
  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSendMail(e) {
    e.preventDefault();
    setLoading(true);
    const randNum = nanoid(10);
    const data = {
      email,
      link: `http://localhost:5173/reset-forgotten-password/${randNum}?q=user_${randNum}`,
    };
    await axios
      .post(`${server}/api/auth/send-reset-email`, data)
      .then(() => {
        setEmail({ email: "" });
        setLoading(false);
        setEmailSent(true);
      })
      .catch((err) => {
        toast.error(
          "There was an error sending your password reset OTP. Please try again.",
          {
            id: "error",
          }
        );
        console.log(err, "error sending your password reset OTP");
        setLoading(false);
      });
  }

  return (
    <>
      {!emailSent ? (
        <div className="loginPage">
          <div className="form">
            <h2 className="title">Forgot Password?</h2>
            <span>
              Enter your email address below, and we&apos;ll send you a password
              reset OTP
            </span>
            <form onSubmit={handleSendMail}>
              <div className="inputBox">
                <input
                  className="input"
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  ref={emailRef}
                  name="email"
                  autoComplete="off"
                  onFocus={() => setUserFocus(true)}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="signIn">
                {!loading ? "Send Mail" : "Sending mail..."}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h2>Check Mail</h2>
          <p>We have sent a password recover instructions to your email.</p>
          <a href="mailto:?" target="_blank" rel="noopener noreferrer">
            Open Mail
          </a>
        </div>
      )}
    </>
  );
}

export default PasswordResetEmail;
