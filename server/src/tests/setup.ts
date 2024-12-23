import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDB } from '../config/database';

let mongod: MongoMemoryServer;

// Connect to in-memory database before tests
beforeAll(async () => {
  try {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await connectDB(uri);
  } catch (error) {
    console.error('Error setting up test database:', error);
    throw error;
  }
});

// Clear database between tests
beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

// Disconnect and stop server after tests
afterAll(async () => {
  try {
    if (mongoose.connection) {
      await mongoose.connection.close();
    }
    if (mongod) {
      await mongod.stop();
    }
  } catch (error) {
    console.error('Error cleaning up test database:', error);
    throw error;
  }
});
