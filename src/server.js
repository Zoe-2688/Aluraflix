const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
  // Ejemplo de configuración de una cookie con SameSite=None; Secure
  res.cookie('key', 'value', {
    sameSite: 'None',
    secure: true
  });

  res.send('Cookie establecida correctamente');
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
