import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button component', () => {
  
  it('renders primary button by default', () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('primary');
  });

  it('renders secondary button when type is specified as secondary', () => {
    render(<Button type="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('secondary');
  });

  it('calls onClick callback when button is clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByText('Click Me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText('Disabled Button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

});