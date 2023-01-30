// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiBWwe76tOuAuqfmV5XmofYNoTH0uEUgY",
    authDomain: "iniciatec-1e464.firebaseapp.com",
    databaseURL: "https://iniciatec-1e464-default-rtdb.firebaseio.com",
    projectId: "iniciatec-1e464",
    storageBucket: "iniciatec-1e464.appspot.com",
    messagingSenderId: "373156824374",
    appId: "1:373156824374:web:4939fb8c42650c3073df97"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)