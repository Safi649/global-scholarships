// 📁 firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyClpsjlFZrsFEi-tVIjoN-R5Wk801gb0sM",
  authDomain: "scholarships-1fc74.firebaseapp.com",
  projectId: "scholarships-1fc74",
  storageBucket: "scholarships-1fc74.firebasestorage.app",
  messagingSenderId: "230006779571",
  appId: "1:230006779571:web:04a02a9fadec274e6f4ac6",
  measurementId: "G-1HKY81QFTD",
};

// ✅ Prevent re-initialization (Next.js hot reload)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Optional: Initialize analytics (only on supported platforms)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { auth, db, app, analytics };
