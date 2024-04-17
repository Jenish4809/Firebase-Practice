import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC_YUU_QU8MvnU-gy6JWwFgNoUJB1jRgII",
  authDomain: "fir-test-e6304.firebaseapp.com",
  projectId: "fir-test-e6304",
  storageBucket: "fir-test-e6304.appspot.com",
  messagingSenderId: "637414731698",
  appId: "1:637414731698:web:551b32c2d68a09a131beab",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
