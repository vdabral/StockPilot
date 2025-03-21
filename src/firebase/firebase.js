import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxLq5MoHvpY3k4D0y6clbOO2IERXXR9Jw",
  authDomain: "stockpilot-f1de6.firebaseapp.com",
  projectId: "stockpilot-f1de6",
  storageBucket: "stockpilot-f1de6.firebasestorage.app",
  messagingSenderId: "144337825630",
  appId: "1:144337825630:web:d2dc48bb3d3b55cc9969cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
