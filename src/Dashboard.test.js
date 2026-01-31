import { render, screen } from '@testing-library/react';
import Dashboard from './pages/Dashboard';

jest.mock('./api', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] }))
}));

test('renders dashboard title', () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/Operational Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders metrics cards', () => {
  render(<Dashboard />);
  expect(screen.getByText(/Total Assets/i)).toBeInTheDocument();
  expect(screen.getByText(/Active/i)).toBeInTheDocument();
});