// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// <<< SEU CONFIG (não muda nada aqui embaixo)
const firebaseConfig = {
    apiKey: "AIzaSyAvaZaYtkVtG_43_jYLYrfA5lSLZgPZc",
    authDomain: "connexta-eae2.firebaseapp.com",
    projectId: "connexta-eae2c",
    storageBucket: "connexta-eae2.appspot.com",
    messagingSenderId: "284366677534",
    appId: "1:284366677534:web:29aD21cba48fa33c87ecf"
};
// >>>

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);