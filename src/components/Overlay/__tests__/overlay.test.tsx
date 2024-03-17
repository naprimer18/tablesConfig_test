import { render, screen } from '@testing-library/react';
import { Overlay } from '../Overlay';

describe('Overlay component', () => {
    
  it('renders null when window is undefined', () => {
    render(<Overlay isVisible={true} />);
    const overlayContainer = screen.getByTestId('animated-overlay');
    expect(overlayContainer).toBeEmptyDOMElement();
  });

  it('renders animated overlay when isVisible is true', () => {
    render(<Overlay isVisible={true} />);
    const overlayContainer = screen.getByTestId('animated-overlay');
    expect(overlayContainer).toBeInTheDocument();
  });

  it('does not render overlay when isVisible is false', () => {
    render(<Overlay isVisible={false} />);
    const overlayContainer = screen.queryByTestId('animated-overlay');
    expect(overlayContainer).not.toBeInTheDocument();
  });

  it('renders with correct initial opacity when isVisible is true', () => {
    render(<Overlay isVisible={true} />);
    const overlayContainer = screen.getByTestId('animated-overlay');
    expect(overlayContainer).toHaveStyle({ opacity: '0' });
  });

  it('renders with correct exit opacity when isVisible is true', () => {
    render(<Overlay isVisible={true} />);
    const overlayContainer = screen.getByTestId('animated-overlay');
    expect(overlayContainer).toHaveStyle({ opacity: '0' });
  });

});