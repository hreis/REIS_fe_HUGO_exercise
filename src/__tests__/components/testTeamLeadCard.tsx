import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import TeamLeadCard from '../../components/TeamLeadCard';

const customRender = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, {wrapper: BrowserRouter});
};

const teamLeadMock = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'johndoe',
    location: 'New York',
    avatarUrl: '/path/to/avatar.jpg',
  };

describe('TeamLeadCard', () => {

  const mockNavigate = jest.fn();

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays the team lead information', () => {
    customRender(<TeamLeadCard teamLead={teamLeadMock} />);
    expect(screen.getByText(/Team Lead/)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/New York/)).toBeInTheDocument();
  });
});
