// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGqynxRT1kEafI3xFdo9dM1gu2RIqWxxU",
  authDomain: "transporte-mario-guizzo.firebaseapp.com",
  projectId: "transporte-mario-guizzo",
  storageBucket: "transporte-mario-guizzo.appspot.com",
  messagingSenderId: "465536166890",
  appId: "1:465536166890:web:f658690629b09eca8fa093",
  measurementId: "G-187MCQ2XPW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
