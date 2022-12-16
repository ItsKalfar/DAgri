import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "dagri-fd183.firebaseapp.com",
  projectId: "dagri-fd183",
  storageBucket: "dagri-fd183.appspot.com",
  messagingSenderId: "743343371958",
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
