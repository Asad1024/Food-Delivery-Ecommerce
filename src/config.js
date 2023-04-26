import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_4K1-SXO2tOueqV_GEtwXM3Pen8_J5uw",
  authDomain: "food-application-1ffe5.firebaseapp.com",
  projectId: "food-application-1ffe5",
  storageBucket: "food-application-1ffe5.appspot.com",
  messagingSenderId: "861178152252",
  appId: "1:861178152252:web:ce3fd1d7415663d4bf4a39",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
