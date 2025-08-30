// login.js (robusto: busca rol por docId y por campos UID/uid)
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

// --- helper: intenta múltiples formas de obtener el rol ---
async function getRolDeUsuario(uid) {
  // 1) por ID de documento (/usuarios/{uid})
  try {
    const ref = doc(db, "usuarios", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data() || {};
      const rol = (data.rol || data.role || "").toString().toLowerCase();
      console.log("[LOGIN] rol por docId:", rol);
      if (rol) return rol;
    } else {
      console.log("[LOGIN] /usuarios/{uid} no existe");
    }
  } catch (e) {
    console.warn("[LOGIN] getDoc error:", e);
  }

  // 2) por campo UID (mayúsculas)
  try {
    const q1 = query(collection(db, "usuarios"), where("UID", "==", uid));
    const s1 = await getDocs(q1);
    if (!s1.empty) {
      const data = s1.docs[0].data() || {};
      const rol = (data.rol || data.role || "").toString().toLowerCase();
      console.log("[LOGIN] rol por campo UID:", rol);
      if (rol) return rol;
    } else {
      console.log("[LOGIN] no hay docs con campo UID == uid");
    }
  } catch (e) {
    console.warn("[LOGIN] query UID error:", e);
  }

  // 3) por campo uid (minúsculas)
  try {
    const q2 = query(collection(db, "usuarios"), where("uid", "==", uid));
    const s2 = await getDocs(q2);
    if (!s2.empty) {
      const data = s2.docs[0].data() || {};
      const rol = (data.rol || data.role || "").toString().toLowerCase();
      console.log("[LOGIN] rol por campo uid:", rol);
      if (rol) return rol;
    } else {
      console.log("[LOGIN] no hay docs con campo uid == uid");
    }
  } catch (e) {
    console.warn("[LOGIN] query uid error:", e);
  }

  return null; // no encontrado
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log("[LOGIN] UID:", user.uid, "email:", user.email);

    const rol = (await getRolDeUsuario(user.uid)) || "chofer";
    console.log("[LOGIN] Rol resuelto:", rol);

    window.location.href = (rol === "admin") ? "admin.html" : "index.html";
  } catch (error) {
    console.error("[LOGIN] Error de login:", error);
    alert("Error al iniciar sesión: " + (error?.message || error));
  }
});
