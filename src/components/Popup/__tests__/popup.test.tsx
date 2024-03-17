import { render, screen } from '@testing-library/react';
import { Popup } from '../Popup';

describe('Popup component', () => {
  
  it('renders null when isOpened is false', () => {
    render(<Popup isOpened={false}>Test Content</Popup>);
    const popupContainer = screen.queryByTestId('popup-container');
    expect(popupContainer).not.toBeInTheDocument();
  });

  it('renders popup when isOpened is true', () => {
    render(<Popup isOpened={true}>Test Content</Popup>);
    const popupContainer = screen.getByTestId('popup-container');
    expect(popupContainer).toBeInTheDocument();
  });

});