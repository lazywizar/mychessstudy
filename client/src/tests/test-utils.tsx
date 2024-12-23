import React from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

// Create a custom render function that includes providers
function render(
  ui: React.ReactElement,
  {
    route = '/',
    ...renderOptions
  }: RenderOptions & { route?: string } = {}
) {
  // Set the initial route
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    );
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// Re-export everything
export * from '@testing-library/react';
export { render };
