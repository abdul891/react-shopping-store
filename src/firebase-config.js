// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXBE5eRgeX1ZHlYcALKUCcQ-bBBOHgP1c",
  authDomain: "storesignup-1ce7d.firebaseapp.com",
  projectId: "storesignup-1ce7d",
  storageBucket: "storesignup-1ce7d.appspot.com",
  messagingSenderId: "829355422402",
  appId: "1:829355422402:web:b0d7788a44ab249cf9015b",
  measurementId: "G-5FXBSMHTB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {app,auth};