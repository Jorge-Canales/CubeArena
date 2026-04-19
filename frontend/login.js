// frontend/login.js
// Versión CORREGIDA - Todas las opciones funcionan

function guardarUsuario(nombre) {
    localStorage.setItem('cubearena_usuario', nombre);
    console.log('Usuario guardado:', nombre);
}

function irAlIndex() {
    console.log('Redirigiendo a index...');
    window.location.href = '/index.html';
}

// Opción 1: Google (simulado por ahora - te explico después cómo hacerlo real)
document.getElementById('btnGoogle').addEventListener('click', () => {
    console.log('Google clickeado');
    // Por ahora guarda un usuario genérico
    // Para hacerlo REAL necesitas API de Google (te ayudo después)
    guardarUsuario('Usuario_Google_' + Date.now());
    irAlIndex();
});

// Opción 2: Iniciar con nombre de usuario
document.getElementById('btnUsuarioExistente').addEventListener('click', () => {
    console.log('Usuario existente clickeado');
    const group = document.getElementById('usuarioExistenteGroup');
    // Alternar visibilidad
    if (group.style.display === 'none' || group.style.display === '') {
        group.style.display = 'block';
        document.getElementById('crearUsuarioGroup').style.display = 'none';
    } else {
        group.style.display = 'none';
    }
});

// Confirmar usuario existente
document.getElementById('btnConfirmarUsuario').addEventListener('click', () => {
    console.log('Confirmar usuario clickeado');
    const nombre = document.getElementById('nombreUsuario').value.trim();
    if (nombre) {
        guardarUsuario(nombre);
        irAlIndex();
    } else {
        document.getElementById('mensaje').textContent = 'Ingresa un nombre de usuario';
        document.getElementById('mensaje').style.color = 'red';
    }
});

// Opción 3: Crear nuevo usuario
document.getElementById('btnCrearUsuario').addEventListener('click', () => {
    console.log('Crear usuario clickeado');
    const group = document.getElementById('crearUsuarioGroup');
    // Alternar visibilidad
    if (group.style.display === 'none' || group.style.display === '') {
        group.style.display = 'block';
        document.getElementById('usuarioExistenteGroup').style.display = 'none';
    } else {
        group.style.display = 'none';
    }
});

// Confirmar creación de usuario
document.getElementById('btnConfirmarCrear').addEventListener('click', () => {
    console.log('Confirmar crear clickeado');
    const nombre = document.getElementById('nuevoNombre').value.trim();
    if (nombre) {
        guardarUsuario(nombre);
        irAlIndex();
    } else {
        document.getElementById('mensaje').textContent = 'Ingresa un nombre de usuario';
        document.getElementById('mensaje').style.color = 'red';
    }
});

// Opción 4: Ignorar
document.getElementById('btnIgnorar').addEventListener('click', () => {
    console.log('Ignorar clickeado');
    guardarUsuario('Anonimo');
    irAlIndex();
});

// Ocultar los grupos de input al inicio
document.getElementById('usuarioExistenteGroup').style.display = 'none';
document.getElementById('crearUsuarioGroup').style.display = 'none';