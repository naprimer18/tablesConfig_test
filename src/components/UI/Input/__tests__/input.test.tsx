import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Input } from '../Input';

describe('Input component', () => {
  
  it('renders input element with placeholder', () => {
    render(<Input placeholder="Enter something" />);
    const input = screen.getByPlaceholderText('Enter something');
    expect(input).toBeInTheDocument();
  });

  it('applies wrapperClassName to the wrapper div', () => {
    render(<Input placeholder="Enter something" wrapperClassName="wrapper" />);
    const wrapper = screen.getByTestId('input-wrapper');
    expect(wrapper).toHaveClass('wrapper');
  });

  it('applies inputClassName to the input element', () => {
    render(<Input placeholder="Enter something" inputClassName="custom-input" />);
    const input = screen.getByPlaceholderText('Enter something');
    expect(input).toHaveClass('custom-input');
  });

  it('displays error message when error prop is provided', () => {
    render(<Input placeholder="Enter something" error="This field is required" />);
    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
  });

  it('sets input ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input placeholder="Enter something" ref={ref} />);
    const input = screen.getByPlaceholderText('Enter something');
    expect(input).toBe(ref.current);
  });

  it('fires onChange event when typing in input', () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Enter something" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Enter something');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  
});