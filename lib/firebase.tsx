// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM9xGg5o4XRdhHwKaesi_doLiYwwtJVyo",
  authDomain: "testing-b8a9f.firebaseapp.com",
  projectId: "testing-b8a9f",
  storageBucket: "testing-b8a9f.appspot.com",
  messagingSenderId: "275696005896",
  appId: "1:275696005896:web:a505d4ff596fcec0e3f2bd",
  measurementId: "G-FRCJKBWQ2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };