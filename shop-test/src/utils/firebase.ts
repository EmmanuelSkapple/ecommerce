
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAx7REQWsAL9nH3lTnzr1e14Qcpuh1RS1o",
  authDomain: "auth-test-skapple.firebaseapp.com",
  projectId: "auth-test-skapple",
  storageBucket: "auth-test-skapple.appspot.com",
  messagingSenderId: "975481134247",
  appId: "1:975481134247:web:fc50067eb6a57bf92b8f82"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);