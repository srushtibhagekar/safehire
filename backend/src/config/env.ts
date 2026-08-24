import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/safehire',
  JWT_SECRET: process.env.JWT_SECRET || 'safehire_super_secure_jwt_secret_dev_2026_xai',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  ML_API_URL: process.env.ML_API_URL || 'http://127.0.0.1:8000',
  DEMO_AI_MODE: process.env.DEMO_AI_MODE === 'true' || false,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173'
};
