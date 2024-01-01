import { render, screen } from '@testing-library/react';
import Chatapp from './ChatApp';

test('renders learn react link', () => {
  render(<Chatapp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
