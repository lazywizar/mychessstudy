import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDB } from '../config/database';
import { User } from '../models/User';
import { agent } from 'supertest';
import app from '../index';

// Extend the global namespace
declare global {
  var testRequest: ReturnType<typeof agent>;
}

let mongoServer: MongoMemoryServer;

// Connect to in-memory database before tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await connectDB(mongoUri);
  
  // Set up global test request
  global.testRequest = agent(app);
});

// Clear database between tests
beforeEach(async () => {
  // Clear all test data before each test
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

// Disconnect and stop server after tests
afterAll(async () => {
  if (mongoose.connection) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

// Test utilities
export const createTestUser = async (userData = {}) => {
  const defaultUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  };

  return await User.create({ ...defaultUser, ...userData });
};

export const getAuthToken = async (user: any) => {
  const response = await global.testRequest
    .post('/api/auth/login')
    .send({ email: user.email, password: 'password123' });
  
  return response.body.token;
};
