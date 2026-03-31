import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7bc6pOBw9_wkFx9B7o3muDIpG9rMagqA",
  authDomain: "pamiicc-a8248.firebaseapp.com",
  projectId: "pamiicc-a8248",
  storageBucket: "pamiicc-a8248.firebasestorage.app",
  messagingSenderId: "1074464326524",
  appId: "1:1074464326524:web:02f9ea60f602f8bfb71af9",
  measurementId: "G-R2KYV2BXPZ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);