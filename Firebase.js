// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD19fWdAfT7swzanEoxrRwA0ZZqkk54D54",
  authDomain: "school-savior.firebaseapp.com",
  projectId: "school-savior",
  storageBucket: "school-savior.appspot.com",
  messagingSenderId: "528740275444",
  appId: "1:528740275444:web:19428ecf2abc2254e77aa1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app); 