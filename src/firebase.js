
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "YOUR-API-KEY",
    authDomain: "YOUR-AUTH-DOMAIN",
    projectId: "YOUR-PROJECT-ID",
    storageBucket: "YOUR-STORAGE-BUCKET",
    messagingSenderId: "YOUR-MESSAGINGSENDER-ID",
    appId: "YOUR-APP-ID",
    measurementId: "YOUR-MEASUREMENT-ID"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
