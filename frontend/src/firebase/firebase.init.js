// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv_qaQbwCVVofGI-c0rEGGqUXkQqw5NDw",
  authDomain: "frist-client.firebaseapp.com",
  projectId: "frist-client",
  storageBucket: "frist-client.firebasestorage.app",
  messagingSenderId: "828432708426",
  appId: "1:828432708426:web:661e15c6ea85c3fbbf47b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }