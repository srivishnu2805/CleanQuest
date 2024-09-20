
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCh9q0hgYH3gCL_7vktRl70W0eBAxzAa2A",
  authDomain: "cleanquest-6c5df.firebaseapp.com",
  projectId: "cleanquest-6c5df",
  storageBucket: "cleanquest-6c5df.appspot.com",
  messagingSenderId: "448868816176",
  appId: "1:448868816176:web:b17ec04c71b0ba2fb364f5",
  measurementId: "G-68DQH9X1HF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);