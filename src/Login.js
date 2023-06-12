import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "./firebase.config";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [User,setUser] = useState("")
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        navigate('/home')
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    await signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignInWithPopup = async () => {
    await signInWithPopup(auth, provider).then((res) => {
      navigate("/home");
    });
  };

  return !User?(
    <div>
      <div style={{marginBottom:'20px'}}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <button onClick={handleSignInWithPopup}>Sign in with Google</button>
      </div>
      <div style={{display:"flex", gap:"10px"}}>
        <Link to={"/signup"}>Signup</Link>
        <Link to={"/phone"}>Verify using OTP</Link>
      </div>
    </div>
  ):null
};

export default Login;
