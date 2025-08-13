// login.js (reemplazo total)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGqynxRT1kEafI3xFdo9dM1gu2RIqWxxU",
  authDomain: "transporte-mario-guizzo.firebaseapp.com",
  projectId: "transporte-mario-guizzo",
  storageBucket: "transporte-mario-guizzo.appspot.com",
  messagingSenderId: "465536166890",
  appId: "1:465536166890:web:f658690629b09eca8fa093"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    // Buscar el rol en Firestore por UID
    let rol = "chofer";
    const q = query(collection(db, "usuarios"), where("uid", "==", user.uid));
    const snap = await getDocs(q);

    if (!snap.empty) {
      // Si hubiera más de un doc para el mismo uid, priorizamos cualquiera que sea admin
      snap.forEach(d => {
        const r = (d.data().rol || "").toLowerCase();
        if (r === "admin") rol = "admin";
      });
    }

    // Redirigir según rol
    window.location.href = (rol === "admin") ? "admin.html" : "index.html";
  } catch (error) {
    console.error(error);
    alert("Error al iniciar sesión: " + (error?.message || error));
  }
});
