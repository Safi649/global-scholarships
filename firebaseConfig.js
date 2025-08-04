// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClpsjlFZrsFEi-tVIjoN-R5Wk801gb0sM",
  authDomain: "scholarships-1fc74.firebaseapp.com",
  projectId: "scholarships-1fc74",
  storageBucket: "scholarships-1fc74.appspot.com",
  messagingSenderId: "230006779571",
  appId: "1:230006779571:web:04a02a9fadec274e6f4ac6",
  measurementId: "G-1HKY81QFTD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

