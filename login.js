// login.js robusto
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore, doc, getDoc, collection, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

// Helper: intentar obtener el doc de usuarios por UID, luego por uid, luego por email
async function fetchUsuarioDoc(user) {
  // 1) Por ID = UID (recomendado tener así los docs)
  let snap = await getDoc(doc(db, 'usuarios', user.uid));
  if (snap.exists()) return snap.data();

  // 2) Fallback por campo uid
  let qs = await getDocs(query(collection(db, 'usuarios'), where('uid', '==', user.uid)));
  if (!qs.empty) return qs.docs[0].data();

  // 3) Fallback por email (minúsculas)
  const eml = (user.email || '').toLowerCase();
  qs = await getDocs(query(collection(db, 'usuarios'), where('email', '==', eml)));
  if (!qs.empty) return qs.docs[0].data();

  return null;
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  // Normalizar email
  const email = (document.getElementById("email").value || '').trim().toLowerCase();
  const password = document.getElementById("password").value;

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log("[LOGIN] UID:", user.uid, "email:", user.email);

    // Buscar rol en Firestore (doc por UID -> uid -> email)
    const datos = await fetchUsuarioDoc(user);

    if (!datos || !datos.rol) {
      // No se encontró el doc/rol: por seguridad, enviar a chofer
      alert('No pude leer tu rol en "usuarios". Te llevo a la pantalla de chofer.');
      window.location.href = "index.html";
      return;
    }

    const rol = String(datos.rol || '').toLowerCase();
    console.log("[LOGIN] Rol resuelto:", rol);
    window.location.href = (rol === "admin") ? "admin.html" : "index.html";
  } catch (error) {
    console.error("[LOGIN] Error de login:", error);
    alert("Error al iniciar sesión: " + (error?.message || error));
  }
});
