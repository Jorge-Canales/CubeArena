// frontend/script.js
let mediaRecorder;
let chunks = [];

const preview = document.getElementById('preview');
const btnGrabar = document.getElementById('btnGrabar');
const btnParar = document.getElementById('btnParar');

// Pedir cámara
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    preview.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      chunks = [];
      enviarVideo(blob);
    };
  })
  .catch(error => {
    console.error('Error al acceder a la cámara:', error);
    alert('No se pudo acceder a la cámara. Verifica los permisos.');
  });

btnGrabar.onclick = () => {
  mediaRecorder.start();
  btnGrabar.disabled = true;
  btnParar.disabled = false;
  console.log('Grabando...');
};

btnParar.onclick = () => {
  mediaRecorder.stop();
  btnGrabar.disabled = false;
  btnParar.disabled = true;
  console.log('Grabación detenida, guardando...');
};

function enviarVideo(blob) {
    const formData = new FormData();
    formData.append('video', blob, 'clip.webm');
    formData.append('nombre', document.getElementById('nombreInput')?.value || 'Jugador1');
    formData.append('tiempo', document.getElementById('tiempoInput')?.value || '15.2');
    
    fetch('/api/subir-video', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log('Video guardado:', data);
        
        // Mostrar el video en el elemento <video>
        const videoElement = document.getElementById('videoReciente');
        if (videoElement && data.videoUrl) {
            videoElement.src = data.videoUrl;
            videoElement.load();
            videoElement.play();
            console.log('Cargando video desde:', data.videoUrl);
        }
        
        // Mostrar mensaje de éxito
        const mensajeDiv = document.getElementById('mensajeExito');
        if (mensajeDiv) {
            mensajeDiv.innerHTML = `<p>✅ Video guardado: ${data.nombre} - ${data.tiempo}s</p>`;
            setTimeout(() => mensajeDiv.innerHTML = '', 5000);
        } else {
            alert(`✅ Video guardado: ${data.nombre} - ${data.tiempo}s`);
        }
    })
    .catch(error => {
        console.error('Error al enviar:', error);
        alert('Error al guardar el video');
    });
}