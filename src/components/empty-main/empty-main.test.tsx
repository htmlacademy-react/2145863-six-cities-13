import { render, screen } from '@testing-library/react';
import EmptyMain from './empty-main';

describe('Component: EmptyMain', () => {
	it('should render correctly', () => {
		const mockCity = 'Test-city';
		const expectedStatusText = 'No places to stay available';
		const expectedStatusDescText = /We could not find any property available at the moment in/;

		render(<EmptyMain city={mockCity} />);

		expect(screen.getByText(expectedStatusText)).toBeInTheDocument();
		expect(screen.getByText(expectedStatusDescText)).toBeInTheDocument();
		expect(screen.getByText(/Test-city/)).toBeInTheDocument();
	});
});
