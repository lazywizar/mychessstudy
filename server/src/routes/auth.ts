import express from 'express';
import { z } from 'zod';
import { Types } from 'mongoose';
import { User, IUser, IUserDocument } from '../models/User';
import { generateToken } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../config/logger';

const router = express.Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters')
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string()
});

// Type for user response without password
interface UserResponse {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to create user response
const createUserResponse = (user: IUserDocument & { _id: Types.ObjectId }): UserResponse => {
  return {
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

// Register endpoint
router.post('/register', async (req, res, next) => {
  try {
    // Validate request body
    const validatedData = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      throw new AppError('User already exists with this email', 400);
    }

    // Create new user
    const user = await User.create({
      email: validatedData.email,
      password: validatedData.password,
      name: validatedData.name
    });

    // Generate token
    const token = generateToken(user._id.toString());

    // Create safe user response
    const userResponse = createUserResponse(user);

    res.status(201).json({
      status: 'success',
      token,
      data: { user: userResponse }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError(error.errors[0].message, 400));
    } else {
      next(error);
    }
  }
});

// Login endpoint
router.post('/login', async (req, res, next) => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);

    // Find user and include password field
    const user = await User.findOne({ email: validatedData.email }).select('+password');
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(validatedData.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken(user._id.toString());

    // Create safe user response
    const userResponse = createUserResponse(user);

    res.status(200).json({
      status: 'success',
      token,
      data: { user: userResponse }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError(error.errors[0].message, 400));
    } else {
      next(error);
    }
  }
});

// Get current user endpoint
router.get('/me', async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      throw new AppError('Not authenticated', 401);
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const userResponse = createUserResponse(user);

    res.status(200).json({
      status: 'success',
      data: { user: userResponse }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
