const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.on('message', (message) => {
        // Reenviar el mensaje a todos los clientes conectados
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
