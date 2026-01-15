// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDD_4px65g9liWh_EVZn21imT4xeYsXhCM",
    authDomain: "pregonar-6cb22.firebaseapp.com",
    projectId: "pregonar-6cb22",
    storageBucket: "pregonar-6cb22.firebasestorage.app",
    messagingSenderId: "640574407739",
    appId: "1:640574407739:web:3a2d332447478e1385881e",
    measurementId: "G-J1HRD6JYZS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
