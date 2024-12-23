import { rest } from 'msw';

const baseUrl = 'http://localhost:3001';

export const handlers = [
  // Login handler
  rest.post(`${baseUrl}/api/auth/login`, async (req, res, ctx) => {
    const { email, password } = await req.json();

    if (email === 'test@example.com' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({
          status: 'success',
          token: 'fake-token',
          data: {
            user: {
              _id: '123',
              email: 'test@example.com',
              name: 'Test User',
            },
          },
        })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({
        status: 'error',
        message: 'Invalid email or password',
      })
    );
  }),

  // Register handler
  rest.post(`${baseUrl}/api/auth/register`, async (req, res, ctx) => {
    const { email, password, name } = await req.json();

    if (email === 'existing@example.com') {
      return res(
        ctx.status(400),
        ctx.json({
          status: 'error',
          message: 'User already exists with this email',
        })
      );
    }

    return res(
      ctx.status(201),
      ctx.json({
        status: 'success',
        token: 'fake-token',
        data: {
          user: {
            _id: '123',
            email,
            name,
          },
        },
      })
    );
  }),

  // Get user profile handler
  rest.get(`${baseUrl}/api/auth/me`, (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(
        ctx.status(401),
        ctx.json({
          status: 'error',
          message: 'Not authenticated',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        status: 'success',
        data: {
          user: {
            _id: '123',
            email: 'test@example.com',
            name: 'Test User',
          },
        },
      })
    );
  }),

  // Update profile handler
  rest.patch(`${baseUrl}/api/auth/profile`, async (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(
        ctx.status(401),
        ctx.json({
          status: 'error',
          message: 'Not authenticated',
        })
      );
    }

    const { name } = await req.json();
    return res(
      ctx.status(200),
      ctx.json({
        status: 'success',
        data: {
          user: {
            _id: '123',
            email: 'test@example.com',
            name,
          },
        },
      })
    );
  }),
];
