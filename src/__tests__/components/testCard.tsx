import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Card from '../../components/Card';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Card', () => {
  it('should render card with single column', () => {
    const columns = [{key: 'Name', value: 'John Doe'}];
    render(<Card columns={columns} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render card with multiple columns', () => {
    const columns = [
      {key: 'Name', value: 'John Doe'},
      {key: 'Location', value: 'New York'},
      {key: 'Team Lead', value: 'Jane Smith'},
    ];
    render(<Card columns={columns} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Location: New York')).toBeInTheDocument();
    expect(screen.getByText('Team Lead')).toBeInTheDocument();
  });

  it('should navigate when card is clicked and navigation is enabled', () => {
    const navProps = {
      id: '1',
      name: 'Team 1',
    };
    render(
      <Card
          columns={[{key: 'Name', value: 'John Doe'}]}
          url="path"
          navigationProps={navProps}
      />
    );

    fireEvent.click(screen.getByText('John Doe'));

    expect(mockUseNavigate).toHaveBeenCalledWith('path', {state: navProps});
  });

  it('should not navigate when card is clicked and navigation is disabled', () => {
    render(<Card columns={[{key: 'Name', value: 'John Doe'}]} hasNavigation={false} />);

    fireEvent.click(screen.getByText('John Doe'));

    expect(mockUseNavigate).not.toHaveBeenCalled();
  });
});
