import mongoose from 'mongoose';
import { ENV } from './env';

export const connectDB = async (): Promise<boolean> => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[SafeHire DB] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error: any) {
    console.warn(`[SafeHire DB] MongoDB connection warning: ${error.message}`);
    console.warn(`[SafeHire DB] The server will still operate. If MongoDB is offline, fallback mock mode will activate for local review.`);
    return false;
  }
};
