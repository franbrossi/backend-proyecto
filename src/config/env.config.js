import dotenv from 'dotenv';

// Cargo las variables a la memoria
dotenv.config();

// Valido que existan
if (!process.env.PORT) {
  console.error("❌ ERROR FALTAL: Falta la variable PORT en el archivo .env");
  process.exit(1); 
}

if (!process.env.NODE_ENV) {
  console.error("❌ ERROR FALTAL: Falta la variable NODE_ENV en el archivo .env");
  process.exit(1); 
}


export const config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV
};