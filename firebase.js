// 📁 firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClpsjlFZrsFEi-tVIjoN-R5Wk801gb0sM",
  authDomain: "scholarships-1fc74.firebaseapp.com",
  projectId: "scholarships-1fc74",
  storageBucket: "scholarships-1fc74.appspot.com",
  messagingSenderId: "230006779571",
  appId: "1:230006779571:web:e29e6318226d33586f4ac6",
  measurementId: "G-3PM0F3JHDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ Firestore instance

export { db };
