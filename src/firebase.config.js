// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRa96vei1pBO6yXyJ-XuNjpiQ2gCvxbu0",
  authDomain: "flutter-firebase-bd5cd.firebaseapp.com",
  projectId: "flutter-firebase-bd5cd",
  storageBucket: "flutter-firebase-bd5cd.appspot.com",
  messagingSenderId: "407785163830",
  appId: "1:407785163830:web:1180083a250f75bec91c97",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
