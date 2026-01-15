// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBF1wqYIFOZCxaS1qj65ZiPKJM2LYIsCu4",
    authDomain: "pregonar-5751a.firebaseapp.com",
    projectId: "pregonar-5751a",
    storageBucket: "pregonar-5751a.firebasestorage.app",
    messagingSenderId: "967370919675",
    appId: "1:967370919675:web:acac024391502910f6ea5e",
    measurementId: "G-6LXFXGXNKQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
