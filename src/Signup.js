import { useState,useEffect } from "react";
import { createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { useNavigate,Link } from "react-router-dom";
import { auth } from "./firebase.config";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(form);
    await createUserWithEmailAndPassword(auth, form.email, form.password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/")
    })
    .catch((error) => {
        console.log(error.message);
    });
  };
  return !User?(
    <div>
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
      <div>
        <Link to={'/'}>Login</Link>
      </div>
    </div>
  ):null
};

export default Signup;
