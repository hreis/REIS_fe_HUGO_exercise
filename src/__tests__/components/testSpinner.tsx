import React from 'react';
import {render, screen} from '@testing-library/react';
import {Spinner} from '../../components/Spinner';

describe('Spinner', () => {
    it('should render spinner', () => {
        render(<Spinner />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
});
