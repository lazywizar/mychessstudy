import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('displays correct header text', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /MyChessStudy/i });
    const subtext = screen.getByText(/Your personal chess game analysis platform/i);
    expect(heading).toBeInTheDocument();
    expect(subtext).toBeInTheDocument();
  });

  test('has correct CSS classes', () => {
    render(<App />);
    const appDiv = screen.getByRole('banner').parentElement;
    expect(appDiv).toHaveClass('App');
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('App-header');
  });
});
