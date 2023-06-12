import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase.config";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPhone,setUserPhone] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserPhone(user.phoneNumber)
        setUserEmail(user.email);
      } else {
        navigate("/");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (userEmail||userPhone) ? (
    <div>
      <div>Signed in as {userPhone?userPhone:userEmail}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : null;
};

export default Home;
