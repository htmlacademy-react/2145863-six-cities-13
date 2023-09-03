import { render, screen } from '@testing-library/react';
import EmptyFavorite from './empty-favorite';

describe('Component: EmptyFavorite', () => {
	it('should render correctly', () => {
		const expectedTitleText = 'Favorites (empty)';
		const expectedStatusText = 'Nothing yet saved.';
		const expectedStatusDescText = 'Save properties to narrow down search or plan your future trips.';

		render(<EmptyFavorite />);

		expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
		expect(screen.getByText(expectedStatusText)).toBeInTheDocument();
		expect(screen.getByText(expectedStatusDescText)).toBeInTheDocument();
	});
});
