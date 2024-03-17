import { render, screen } from '@testing-library/react';
import { App } from '../App';

describe('App component', () => {

  it('renders without crashing', () => {
    render(<App />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('renders table with correct columns', () => {
    render(<App />);
    const nameColumnHeader = screen.getByText('Name');
    const surnameColumnHeader = screen.getByText('Surname');
    const ageColumnHeader = screen.getByText('Age');
    const cityColumnHeader = screen.getByText('City');
    expect(nameColumnHeader).toBeInTheDocument();
    expect(surnameColumnHeader).toBeInTheDocument();
    expect(ageColumnHeader).toBeInTheDocument();
    expect(cityColumnHeader).toBeInTheDocument();
  });
  
});