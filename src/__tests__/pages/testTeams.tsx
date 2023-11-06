import * as React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import Teams from 'pages/Teams';
import * as API from '../../api';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Teams', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render spinner while loading', async () => {
    jest.spyOn(API, 'getTeams').mockResolvedValueOnce([]);

    render(<Teams />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  it('should render team "Team1"', async () => {
    jest.spyOn(API, 'getTeams').mockResolvedValue([
      {
        id: '1',
        name: 'Team1',
      },
      {
        id: '2',
        name: 'Team2',
      },
    ]);

    render(<Teams />);

    await waitFor(() => {
        expect(screen.getByText(/Team1/)).toBeInTheDocument();
      });
  });

  it('should render team "Team2"', async () => {
    jest.spyOn(API, 'getTeams').mockResolvedValue([
      {
        id: '1',
        name: 'Team1',
      },
      {
        id: '2',
        name: 'Team2',
      },
    ]);

    render(<Teams />);

    await waitFor(() => {
        expect(screen.getByText(/Team2/)).toBeInTheDocument();
      });
  });
});
