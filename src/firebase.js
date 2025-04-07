
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBhxm9igIyBCbuuA7MzDMdgrIsEdWI-EyA",
    authDomain: "digischolar-b7138.firebaseapp.com",
    projectId: "digischolar-b7138",
    storageBucket: "digischolar-b7138.appspot.com",
    messagingSenderId: "897820565743",
    appId: "1:897820565743:web:a74398241dbaf483f63b1a",
    measurementId: "G-WH6ZZF3MQX"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };