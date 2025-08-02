function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Verificamos si es admin (según el email)
      if (user.email === "admin@guizzo.com") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "index.html"; // interfaz del chofer
      }
    })
    .catch((error) => {
      document.getElementById("error").innerText = "Email o contraseña incorrectos";
    });
}
