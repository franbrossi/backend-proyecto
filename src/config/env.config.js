import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_URI
};