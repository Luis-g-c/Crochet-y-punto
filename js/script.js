
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.formulario form');
  form.addEventListener('submit', function (e) {
    // Elimina mensajes previos
    document.querySelectorAll('.error-msg').forEach(el => el.remove());

    let valid = true;

    // Validación de nombre
    const name = document.getElementById('name');
    const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!name.value.trim()) {
      showError(name, 'El nombre es obligatorio');
      valid = false;
    } else if (!namePattern.test(name.value.trim())) {
      showError(name, 'El nombre solo debe contener letras y espacios');
      valid = false;
    };

    // Validación de email
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, 'El email es obligatorio');
      valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      showError(email, 'El email no es válido');
      valid = false;
    }

    // Validación de teléfono
    const phone = document.getElementById('phone');
    const phonePattern = /^\+?\d{7,15}$/;
    if (!phone.value.trim()) {
      showError(phone, 'El teléfono es obligatorio');
      valid = false;
    } else if (!phonePattern.test(phone.value.trim())) {
      showError(phone, 'El teléfono no es válido');
      valid = false;
    }

    // Validación de mensaje
    const mensaje = document.getElementById('mensaje');
    if (!mensaje.value.trim()) {
      showError(mensaje, 'El mensaje es obligatorio');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });

  function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error-msg';
    error.style.color = 'deeppink';
    error.style.fontSize = '0.9em';
    error.style.marginTop = '5px';
    error.textContent = message;
    input.parentNode.appendChild(error);
  }
});