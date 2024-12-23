import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { server } from '../../mocks/server';
import { rest } from 'msw';

describe('ProtectedRoute', () => {
  const ProtectedComponent = () => <div>Protected Content</div>;

  it('redirects to login when not authenticated', async () => {
    render(
      <ProtectedRoute>
        <ProtectedComponent />
      </ProtectedRoute>,
      { route: '/dashboard' }
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });

  it('renders protected content when authenticated', async () => {
    // Set up authenticated state
    localStorage.setItem('token', 'fake-token');

    render(
      <ProtectedRoute>
        <ProtectedComponent />
      </ProtectedRoute>,
      { route: '/dashboard' }
    );

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  it('shows loading state while checking authentication', () => {
    localStorage.setItem('token', 'fake-token');

    render(
      <ProtectedRoute>
        <ProtectedComponent />
      </ProtectedRoute>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('redirects to login when token is invalid', async () => {
    localStorage.setItem('token', 'invalid-token');

    server.use(
      rest.get('http://localhost:3001/api/auth/me', (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            status: 'error',
            message: 'Invalid token',
          })
        );
      })
    );

    render(
      <ProtectedRoute>
        <ProtectedComponent />
      </ProtectedRoute>,
      { route: '/dashboard' }
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });
});
