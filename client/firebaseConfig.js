import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdIfI7X7O04_IpFjvb73VhM6C15cIGhLw",
  authDomain: "dagri-73ddc.firebaseapp.com",
  projectId: "dagri-73ddc",
  storageBucket: "dagri-73ddc.appspot.com",
  messagingSenderId: "271032834083",
  appId: "1:271032834083:web:01c457a4bf15fc7cbcf996",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
