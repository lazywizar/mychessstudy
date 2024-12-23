import mongoose from 'mongoose';
import { logger } from './logger';

export const connectDB = async (uri?: string): Promise<void> => {
  try {
    const mongoURI = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017/mychessstudy';
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(mongoURI);
      logger.info('MongoDB Connected...');
    }
  } catch (err) {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
