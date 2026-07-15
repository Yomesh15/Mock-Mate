import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "mock-mate-2c43a.firebaseapp.com",
  projectId: "mock-mate-2c43a",
  storageBucket: "mock-mate-2c43a.firebasestorage.app",
  messagingSenderId: "547625601355",
  appId: "1:547625601355:web:d64a8fcf90f39d81f2c0ce"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth()

const provider = new GoogleAuthProvider()

export {auth,provider}
