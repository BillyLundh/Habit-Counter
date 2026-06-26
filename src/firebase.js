import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2h4BPTxt54zanwcPF5KrR3KqrGTo2ehs",
  authDomain: "habittracker-9536f.firebaseapp.com",
  projectId: "habittracker-9536f",
  storageBucket: "habittracker-9536f.firebasestorage.app",
  messagingSenderId: "1072336811167",
  appId: "1:1072336811167:web:745a52bed3065352fb9eaa"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;