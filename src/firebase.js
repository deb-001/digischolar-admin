// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration (from your previous image)
const firebaseConfig = {
    apiKey: "AIzaSyBhxm9igIyBCbuuA7MzDMdgrIsEdWI-EyA",
    authDomain: "digischolar-b7138.firebaseapp.com",
    projectId: "digischolar-b7138",
    storageBucket: "digischolar-b7138.firebasestorage.app",
    messagingSenderId: "897820565743",
    appId: "1:897820565743:web:a74398241dbaf483f63b1a",
    measurementId: "G-WH6ZZF3MQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firestore instance
const db = getFirestore(app);

export { db };