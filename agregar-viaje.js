// agregar-viaje.js
import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function guardarViaje() {
  const viaje = {
    fecha: document.getElementById("fecha").value,
    origen: document.getElementById("origen").value,
    destino: document.getElementById("destino").value,
    patente: document.getElementById("patente").value,
    chofer: document.getElementById("chofer").value,
    tipoCarga: document.getElementById("tipoCarga").value,
    peso: document.getElementById("peso").value,
    observaciones: document.getElementById("observaciones").value,
    cuit: document.getElementById("cuit").value,
    adelanto: document.getElementById("adelanto").value,
    peaje: document.getElementById("peaje").value,
    entrada: document.getElementById("entrada").value
  };

  try {
    await addDoc(collection(db, "viajes"), viaje);
    mostrarModalGuardado();
  } catch (e) {
    alert("Error al guardar: " + e);
  }
}

function mostrarModalGuardado() {
  const modal = document.getElementById("modalExito");
  modal.style.display = "block";
  setTimeout(() => {
    modal.style.display = "none";
    window.location.href = "index.html";
  }, 5000);
}
