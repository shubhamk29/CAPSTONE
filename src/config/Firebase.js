import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
} from "firebase/auth";
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
//   measurementId: process.env.REACT_APP_measurementId,
// };
const firebaseConfig = {
  apiKey: "AIzaSyBa_r3V8Z51Cyv6igay-5u1fr-rz3sEqhA",
  authDomain: "bengaluru-crime-authority.firebaseapp.com",
  projectId: "bengaluru-crime-authority",
  storageBucket: "bengaluru-crime-authority.appspot.com",
  messagingSenderId: "470647953977",
  appId: "1:470647953977:web:2b2eb657c31a90cdb08be8",
  measurementId: "G-VSJGEKKRB8",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
  auth,
  db,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
};
