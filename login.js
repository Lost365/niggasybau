let intentos = 0
const MAX_INTENTOS = 3

document.addEventListener('DOMContentLoaded', () => {
  const btnLogin = document.getElementById('btnLogin')
  const btnRegistrar = document.getElementById('btnRegistrar')
  const btnCambiar = document.getElementById('btnCambiar')

  if (btnLogin) {
    btnLogin.addEventListener('click', verificarLogin)
  }

  if (btnRegistrar) {
    btnRegistrar.addEventListener('click', registrarUsuario)
  }

  if (btnCambiar) {
    btnCambiar.addEventListener('click', cambiarCredenciales)
  }
})

function verificarLogin() {
  const usuario = document.getElementById('usuario').value
  const clave = document.getElementById('clave').value
  const mensaje = document.getElementById('mensaje')

  const usuarioRegistrado = localStorage.getItem('usuario')
  const claveRegistrada = localStorage.getItem('clave')

  if (!usuarioRegistrado || !claveRegistrada) {
    mensaje.textContent = 'No hay usuario registrado.'
    mensaje.style.color = 'red'
    return
  }

  if (usuario === usuarioRegistrado && clave === claveRegistrada) {
    mensaje.textContent = '¡Bienvenido!'
    mensaje.style.color = 'green'
    intentos = 0
  } else {
    intentos++
    if (intentos >= MAX_INTENTOS) {
      mensaje.textContent = 'Usuario bloqueado por demasiados intentos.'
      mensaje.style.color = 'red'
      document.getElementById('usuario').disabled = true
      document.getElementById('clave').disabled = true
      document.getElementById('btnLogin').disabled = true
    } else {
      mensaje.textContent = `Error: te quedan ${MAX_INTENTOS - intentos} intentos.`
      mensaje.style.color = 'red'
    }
  }
}

function registrarUsuario() {
  const nuevoUsuario = document.getElementById('registroUsuario').value
  const nuevaClave = document.getElementById('registroClave').value
  const mensaje = document.getElementById('mensaje')

  if (nuevoUsuario && nuevaClave) {
    localStorage.setItem('usuario', nuevoUsuario)
    localStorage.setItem('clave', nuevaClave)
    mensaje.textContent = 'Registro exitoso. Ahora puedes iniciar sesión.'
    mensaje.style.color = 'green'
  } else {
    mensaje.textContent = 'Por favor, completa ambos campos.'
    mensaje.style.color = 'red'
  }
}

function cambiarCredenciales() {
  const nuevoUsuario = document.getElementById('nuevoUsuario').value
  const nuevaClave = document.getElementById('nuevaClave').value
  const mensaje = document.getElementById('mensaje')

  if (nuevoUsuario && nuevaClave) {
    localStorage.setItem('usuario', nuevoUsuario)
    localStorage.setItem('clave', nuevaClave)
    intentos = 0
    mensaje.textContent = 'Credenciales actualizadas. Vuelve al login.'
    mensaje.style.color = 'green'
  } else {
    mensaje.textContent = 'Por favor, completa ambos campos.'
    mensaje.style.color = 'red'
  }
}