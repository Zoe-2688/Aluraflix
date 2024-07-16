const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Configuración de middleware
app.use(helmet({
  frameguard: {
    action: 'sameorigin' // Permitir solo desde el mismo origen (http://localhost:3000)
    // action: 'deny' // Si deseas deshabilitar completamente el uso de iframes
  }
}));
app.use(cookieParser());

// Ruta para establecer una cookie
app.get('/', (req, res) => {
  // Ejemplo de configuración de una cookie con SameSite=None; Secure
  res.cookie('key', 'value', {
    sameSite: 'None',
    secure: true
  });

  res.send('Cookie establecida correctamente');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
