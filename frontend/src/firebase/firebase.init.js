// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1-bPVGK0uGKh6308SnE9kpRiohuvhnXM",
  authDomain: "homesitting-ec9a8.firebaseapp.com",
  projectId: "homesitting-ec9a8",
  storageBucket: "homesitting-ec9a8.firebasestorage.app",
  messagingSenderId: "789544021436",
  appId: "1:789544021436:web:0fc82fd6422a2d0dca4fb9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);