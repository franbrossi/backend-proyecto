import { createServer } from 'node:http'; 
import { Server } from 'socket.io'; 
import app from './app.js';
import { envConfig } from './config/env.config.js';
import { connectDB } from './config/database.config.js';

const PORT = envConfig.port;

const startServer = async () => {
  await connectDB();
  
  const httpServer = createServer(app);
  
  const io = new Server(httpServer);

  app.set('socketio', io);

  io.on('connection', (socket) => {
    console.log('🟢 Nuevo cliente conectado al navegador:', socket.id);
    
    socket.on('disconnect', () => {
      console.log('🔴 Cliente desconectado:', socket.id);
    });
  });

  httpServer.listen(PORT, () => {
    console.log(`⚡ Servidor HTTP y WebSockets escuchando en http://localhost:${PORT}`);
  });
};

startServer();