import app from './app.js';
import { envConfig } from './config/env.config.js';
import { connectDB } from './config/database.config.js'; 

const PORT = envConfig.port;

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`⚡ Servidor Express escuchando en http://localhost:${PORT}`);
    console.log(`Entorno: ${process.env.NODE_ENV}`);
  });
};

startServer();