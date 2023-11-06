import React from 'react';
import {render, screen} from '@testing-library/react';
import TeamOverview from 'pages/TeamOverview';

// component's expectation for location.state
jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    state: {name: 'Some Team'}, // to match what the component is expecting
  }),
  useNavigate: () => jest.fn(),
  useParams: () => ({teamId: '1'}),
}));

describe('TeamOverview', () => {
  it('renders the TeamOverview component with the correct team name', () => {
    render(<TeamOverview />);
    expect(screen.getByText(/Team Some Team/)).toBeInTheDocument();
  });
});

