// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBspKs4LRrZULCNCi6-zNnGIrnA2_GB13g",
  authDomain: "pantry-tracker-d4523.firebaseapp.com",
  projectId: "pantry-tracker-d4523",
  storageBucket: "pantry-tracker-d4523.appspot.com",
  messagingSenderId: "1058225026347",
  appId: "1:1058225026347:web:d6893556f12469b3f2c16e",
  measurementId: "G-6HLEVP39XE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, app };