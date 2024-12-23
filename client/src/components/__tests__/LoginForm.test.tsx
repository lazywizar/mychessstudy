import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test/test-utils';
import { LoginForm } from '../LoginForm';
import { server } from '../../test/mocks/server';
import { rest } from 'msw';

describe('LoginForm', () => {
  const setup = () => {
    const user = userEvent.setup();
    const utils = render(<LoginForm />);
    return {
      user,
      ...utils,
    };
  };

  it('renders login form', () => {
    setup();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const { user } = setup();
    
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    const { user } = setup();
    
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const { user } = setup();
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });

  it('handles login failure', async () => {
    const { user } = setup();
    
    server.use(
      rest.post('http://localhost:3001/api/auth/login', (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            status: 'error',
            message: 'Invalid credentials',
          })
        );
      })
    );
    
    await user.type(screen.getByLabelText(/email/i), 'wrong@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it('disables form submission while loading', async () => {
    const { user } = setup();
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);
    
    expect(submitButton).toBeDisabled();
  });
});
