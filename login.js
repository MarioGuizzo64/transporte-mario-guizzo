import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGqynxRT1kEafI3xFdo9dM1gu2RIqWxxU",
  authDomain: "transporte-mario-guizzo.firebaseapp.com",
  projectId: "transporte-mario-guizzo",
  storageBucket: "transporte-mario-guizzo.firebasestorage.app",
  messagingSenderId: "465536166890",
  appId: "1:465536166890:web:f658690629b09eca8fa093",
  measurementId: "G-187MCQ2XPW"
};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    // Lógica de redirección según correo
    if (email === "admin@guizzo.com") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }

if (error.code === "auth/user-not-found") {
  alert("Usuario no encontrado.");
} else if (error.code === "auth/wrong-password") {
  alert("Contraseña incorrecta.");
} else {
  alert("Error al iniciar sesión: " + error.message);
}

});
