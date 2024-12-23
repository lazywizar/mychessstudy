import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { server } from '../../test/mocks/server';
import { rest } from 'msw';

describe('AuthContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  beforeEach(() => {
    localStorage.clear();
  });

  it('provides initial auth state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('handles successful login', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });
    
    expect(result.current.user).toEqual({
      _id: '123',
      email: 'test@example.com',
      name: 'Test User',
    });
    expect(localStorage.getItem('token')).toBe('fake-token');
  });

  it('handles login failure', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
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
    
    try {
      await act(async () => {
        await result.current.login('wrong@example.com', 'wrongpassword');
      });
    } catch (error) {
      expect(result.current.user).toBeNull();
      expect(result.current.error).toBe('Invalid credentials');
      expect(localStorage.getItem('token')).toBeNull();
    }
  });

  it('handles logout', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // First login
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });
    
    // Then logout
    act(() => {
      result.current.logout();
    });
    
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('loads user from token on mount', async () => {
    localStorage.setItem('token', 'fake-token');
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      // Wait for the initial user fetch to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    
    expect(result.current.user).toEqual({
      _id: '123',
      email: 'test@example.com',
      name: 'Test User',
    });
  });

  it('handles invalid token on mount', async () => {
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
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      // Wait for the initial user fetch to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
