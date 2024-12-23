import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { Types } from 'mongoose';
import { User, IUser, IUserDocument } from '../models/User';
import { generateToken, protect } from '../middleware/auth';
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

const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters')
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
    logger.info('Register attempt', { email: req.body.email });
    
    // Validate request body
    const validatedData = registerSchema.parse(req.body);
    logger.debug('Validation passed', { email: validatedData.email });

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      logger.warn('Registration failed - User exists', { email: validatedData.email });
      throw new AppError('User already exists with this email', 400);
    }

    // Create new user
    const user = await User.create({
      email: validatedData.email,
      password: validatedData.password,
      name: validatedData.name
    });
    logger.info('User created successfully', { userId: user._id });

    // Generate token
    const token = generateToken(user._id.toString());
    logger.debug('Token generated for user', { userId: user._id });

    // Create safe user response
    const userResponse = createUserResponse(user);

    logger.info('Registration successful', { userId: user._id });
    res.status(201).json({
      status: 'success',
      token,
      data: { user: userResponse }
    });
  } catch (error) {
    logger.error('Registration error', { error });
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
    logger.info('Login attempt', { email: req.body.email });
    
    // Validate request body
    const validatedData = loginSchema.parse(req.body);
    logger.debug('Login validation passed', { email: validatedData.email });

    // Find user and include password field
    const user = await User.findOne({ email: validatedData.email }).select('+password');
    if (!user) {
      logger.warn('Login failed - User not found', { email: validatedData.email });
      throw new AppError('Invalid email or password', 401);
    }
    logger.debug('User found', { userId: user._id });

    // Check password
    const isPasswordValid = await user.comparePassword(validatedData.password);
    if (!isPasswordValid) {
      logger.warn('Login failed - Invalid password', { email: validatedData.email });
      throw new AppError('Invalid email or password', 401);
    }
    logger.debug('Password validated successfully');

    // Generate token
    const token = generateToken(user._id.toString());
    logger.debug('Token generated for user', { userId: user._id });

    // Create safe user response
    const userResponse = createUserResponse(user);

    logger.info('Login successful', { userId: user._id });
    res.json({
      status: 'success',
      token,
      data: { user: userResponse }
    });
  } catch (error) {
    logger.error('Login error', { error });
    if (error instanceof z.ZodError) {
      next(new AppError(error.errors[0].message, 400));
    } else {
      next(error);
    }
  }
});

// Get current user endpoint
router.get('/me', protect, async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      throw new AppError('Not authenticated', 401);
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const userResponse = createUserResponse(user);

    logger.info('User retrieved successfully', { userId: user._id });
    res.status(200).json({
      status: 'success',
      data: { user: userResponse }
    });
  } catch (error) {
    logger.error('Error retrieving user', { error });
    next(error);
  }
});

// Update profile endpoint
router.patch('/profile', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Since this route uses the protect middleware, we can be sure req.user exists
    // But we need to satisfy TypeScript
    if (!req.user) {
      throw new AppError('Not authenticated', 401);
    }

    logger.info('Profile update attempt', { userId: req.user._id });

    // Validate request body
    const validatedData = updateProfileSchema.parse(req.body);
    logger.debug('Profile update validation passed', { userId: req.user._id });

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: validatedData.name },
      { new: true, runValidators: true }
    );

    if (!user) {
      logger.warn('Profile update failed - User not found', { userId: req.user._id });
      throw new AppError('User not found', 404);
    }

    // Create safe user response
    const userResponse = createUserResponse(user);

    logger.info('Profile updated successfully', { userId: user._id });
    res.json({
      status: 'success',
      data: { user: userResponse }
    });
  } catch (error) {
    logger.error('Profile update error', { error });
    if (error instanceof z.ZodError) {
      next(new AppError(error.errors[0].message, 400));
    } else {
      next(error);
    }
  }
});

export default router;
