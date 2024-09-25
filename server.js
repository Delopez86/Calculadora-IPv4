const { createServer } = require('node:http');
const { readFile } = require('node:fs');
const { join, extname } = require('node:path');

const hostname = '127.0.0.1';
const port = 80;

// Mapeo de extensiones a tipos MIME
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Servidor HTTP
const server = createServer((req, res) => {
  // Definir la ruta del archivo solicitado
  let filePath = join(__dirname, req.url === '/' ? 'index.html' : req.url);

  // Obtener la extensión del archivo solicitado
  const ext = extname(filePath).toLowerCase();

  // Definir el tipo de contenido basado en la extensión
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  // Leer el archivo y enviarlo como respuesta
  readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 Not Found');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    }
  });
});

// Escuchar en el puerto 8080
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
