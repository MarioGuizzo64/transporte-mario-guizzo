document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const cuil = document.getElementById('cuil').value;
  const password = document.getElementById('password').value;

  // Simulación de login simple (más adelante conectamos a Firebase)
  if (cuil === '20123456789' && password === '1234') {
    window.location.href = 'menu.html';
  } else {
    alert('CUIL o contraseña incorrectos');
  }
});
