const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear la aplicación
const app = express();
const port = 3000;

// Asegurar que la carpeta uploads existe
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Configuración simple de multer (sin renombrar aún)
const upload = multer({ dest: 'uploads/' });

// Ruta principal - muestra login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'login.html'));
});

// Servir archivos del frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Servir archivos estáticos de uploads (para ver los videos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta para recibir videos
app.post('/api/subir-video', upload.single('video'), (req, res) => {
    const { nombre, tiempo } = req.body;
    const oldPath = req.file.path;
    const oldFilename = req.file.filename;
    
    // Crear nuevo nombre con los datos del jugador
    const sanitizedNombre = (nombre || 'anonimo').replace(/[^a-z0-9]/gi, '_');
    const tiempoNum = parseFloat(tiempo) || 0;
    const newFilename = `${sanitizedNombre}_${tiempoNum}s_${Date.now()}.webm`;
    const newPath = path.join('uploads', newFilename);
    
    // Renombrar el archivo
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error('Error al renombrar:', err);
            return res.status(500).json({ ok: false, error: 'Error al guardar video' });
        }
        
        console.log(`📹 Video recibido:`);
        console.log(`   Jugador: ${nombre || 'anonimo'}`);
        console.log(`   Tiempo: ${tiempo || '?'} segundos`);
        console.log(`   Guardado en: ${newFilename}`);
        
        res.json({ 
            ok: true, 
            mensaje: 'Video guardado correctamente',
            videoUrl: `/uploads/${newFilename}`,
            nombre: nombre || 'anonimo',
            tiempo: tiempo || 0
        });
    });
});

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({ mensaje: 'El backend funciona correctamente' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${port}`);
    console.log(`📁 Sirviendo frontend desde: ${path.join(__dirname, '..', 'frontend')}`);
    console.log(`🎬 Los videos estarán en: http://localhost:${port}/uploads/`);
});