import { useState,useEffect } from "react";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber,onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const PhoneVerification = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();
  const [User,setUser] = useState("")

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        navigate('/home')
      }
    });
  }, []);

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const onSignup = () => {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + 91 + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onOTPVerify = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        navigate("/home");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return !User?(
    <div>
      <div id="recaptcha-container"></div>
      <div>
        {showOTP ? (
          <>
            <label htmlFor="otp">Enter your OTP</label>
            <input type="number" onChange={(e) => setOtp(e.target.value)} />
            <button onClick={onOTPVerify}>
              <span>Verify OTP</span>
            </button>
            {loading && <div>Loading...</div>}
          </>
        ) : (
          <div>
            <div>
              <label htmlFor="">Verify your phone number</label>
              <input type="number" onChange={(e) => setPh(e.target.value)} />
            </div>
            <div>
              <button onClick={onSignup}>
                <span>Send code via SMS</span>
              </button>
            </div>
            <Link to={"/"}>Login</Link>
            {loading && <div>Loading...</div>}
          </div>
        )}
      </div>
    </div>
  ):null;
};

export default PhoneVerification;
