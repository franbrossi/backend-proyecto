import app from './app.js';
import { config } from './config/env.config.js';

app.listen(config.port, () => {
  console.log(`🚀 Servidor Express escuchando en http://localhost:${config.port}`);
  console.log(`Entorno: ${config.nodeEnv}`);
});