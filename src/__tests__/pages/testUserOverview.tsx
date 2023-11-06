import React from 'react';
import {render, screen} from '@testing-library/react';
import UserOverview from 'pages/UserOverview';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

describe('UserOverview', () => {
    it('should render UserOverview', () => {
        render(<UserOverview />);

        const userElements = screen.getAllByText(/Test User/);
        expect(userElements).toHaveLength(2);
        expect(screen.getByText(/location/)).toBeInTheDocument();
    });
});
