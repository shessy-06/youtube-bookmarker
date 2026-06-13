import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMILcsT6vbZ9n8k2C6KdJ4Qi84_nUZEz4",
  authDomain: "bookmarker-59d52.firebaseapp.com",
  projectId: "bookmarker-59d52",
  storageBucket: "bookmarker-59d52.firebasestorage.app",
  messagingSenderId: "494154603896",
  appId: "1:494154603896:web:ff06649c07d3c0284bfc8d",
  measurementId: "G-LBBFF9KHXB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();