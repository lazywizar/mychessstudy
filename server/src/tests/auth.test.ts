import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, IUserDocument } from '../models/User';
import mongoose from 'mongoose';
import { createTestUser } from './setup';

describe('Authentication', () => {
  const validUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  };

  describe('User Registration', () => {
    it('should register a new user with valid data', async () => {
      const res = await global.testRequest
        .post('/api/auth/register')
        .send(validUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.data.user).toHaveProperty('email', validUser.email);
      expect(res.body.data.user).toHaveProperty('name', validUser.name);
      expect(res.body.data.user).not.toHaveProperty('password');
    });

    it('should store hashed password', async () => {
      const res = await global.testRequest
        .post('/api/auth/register')
        .send(validUser);

      const userDoc = await User.findById(res.body.data.user._id)
        .select('+password')
        .exec()
        .then(doc => {
          if (!doc) throw new Error('User not found');
          return doc as unknown as IUserDocument;
        });

      expect(userDoc.password).not.toBe(validUser.password);
      const isMatch = await userDoc.comparePassword(validUser.password);
      expect(isMatch).toBe(true);
    });

    it('should not register user with existing email', async () => {
      // First registration
      await global.testRequest
        .post('/api/auth/register')
        .send(validUser);

      // Second registration with same email
      const res = await global.testRequest
        .post('/api/auth/register')
        .send(validUser);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('User already exists with this email');
    });

    it('should validate email format', async () => {
      const invalidUser = { ...validUser, email: 'invalid-email' };
      const res = await global.testRequest
        .post('/api/auth/register')
        .send(invalidUser);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Invalid email format');
    });

    it('should validate password length', async () => {
      const invalidUser = { ...validUser, password: '123' };
      const res = await global.testRequest
        .post('/api/auth/register')
        .send(invalidUser);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Password must be at least 8 characters');
    });

    it('should validate name length', async () => {
      const invalidUser = { ...validUser, name: 'A' };
      const res = await global.testRequest
        .post('/api/auth/register')
        .send(invalidUser);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Name must be at least 2 characters');
    });
  });

  describe('User Login', () => {
    beforeEach(async () => {
      await global.testRequest
        .post('/api/auth/register')
        .send(validUser);
    });

    it('should login with valid credentials', async () => {
      const res = await global.testRequest
        .post('/api/auth/login')
        .send({
          email: validUser.email,
          password: validUser.password
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.data.user).toHaveProperty('email', validUser.email);
    });

    it('should not login with incorrect password', async () => {
      const res = await global.testRequest
        .post('/api/auth/login')
        .send({
          email: validUser.email,
          password: 'wrongpassword'
        });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid email or password');
    });

    it('should not login with non-existent email', async () => {
      const res = await global.testRequest
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: validUser.password
        });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid email or password');
    });
  });

  describe('Protected Routes', () => {
    let token: string;
    let user: any;

    beforeEach(async () => {
      const res = await global.testRequest
        .post('/api/auth/register')
        .send(validUser);

      token = res.body.token;
      user = res.body.data.user;
    });

    it('should access protected route with valid token', async () => {
      const res = await global.testRequest
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.user.email).toBe(user.email);
    });

    it('should not access protected route without token', async () => {
      const res = await global.testRequest
        .get('/api/auth/me');

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Not authenticated. Please log in.');
    });

    it('should not access protected route with invalid token', async () => {
      const res = await global.testRequest
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token');

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid token. Please log in again.');
    });

    it('should not access protected route after user deletion', async () => {
      await User.findByIdAndDelete(user._id);

      const res = await global.testRequest
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('User no longer exists.');
    });
  });

  describe('Password Security', () => {
    it('should use unique salt for each user', async () => {
      // Create two users with same password
      const user1Data = { ...validUser };
      const user2Data = { ...validUser, email: 'test2@example.com' };

      const user1Res = await global.testRequest
        .post('/api/auth/register')
        .send(user1Data);
      const user2Res = await global.testRequest
        .post('/api/auth/register')
        .send(user2Data);

      const [userDoc1, userDoc2] = await Promise.all([
        User.findById(user1Res.body.data.user._id)
          .select('+password')
          .exec()
          .then(doc => {
            if (!doc) throw new Error('User 1 not found');
            return doc as unknown as IUserDocument;
          }),
        User.findById(user2Res.body.data.user._id)
          .select('+password')
          .exec()
          .then(doc => {
            if (!doc) throw new Error('User 2 not found');
            return doc as unknown as IUserDocument;
          })
      ]);

      // Even with same password, hashes should be different
      expect(userDoc1.password).not.toBe(userDoc2.password);

      // Both passwords should still be valid
      const isMatch1 = await userDoc1.comparePassword(validUser.password);
      const isMatch2 = await userDoc2.comparePassword(validUser.password);
      expect(isMatch1).toBe(true);
      expect(isMatch2).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle concurrent registrations with same email', async () => {
      const concurrentUser = {
        email: 'concurrent@example.com',
        password: 'password123',
        name: 'Concurrent User'
      };

      // Create multiple registration promises
      const registrationPromises = Array(5).fill(null).map(() =>
        global.testRequest
          .post('/api/auth/register')
          .send(concurrentUser)
          .then(res => ({ success: res.status === 201 }))
          .catch(() => ({ success: false }))
      );

      const results = await Promise.all(registrationPromises);
      const successCount = results.filter(r => r.success).length;
      const errorCount = results.filter(r => !r.success).length;

      // Only one registration should succeed
      expect(successCount).toBe(1);
      expect(errorCount).toBe(4);
    });

    it('should handle special characters in user data', async () => {
      const specialUser = {
        email: 'special.user+test@example.com',
        password: 'password!@#$%^&*()',
        name: 'User with Special Characters!@#'
      };

      const res = await global.testRequest
        .post('/api/auth/register')
        .send(specialUser);

      expect(res.status).toBe(201);
      expect(res.body.data.user.email).toBe(specialUser.email);
      expect(res.body.data.user.name).toBe(specialUser.name);
    });
  });
});
