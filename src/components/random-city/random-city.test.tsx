import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import { MemoryHistory, createMemoryHistory } from 'history';
import RandomCity from './random-city';

describe('Component: RandomCity', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly', () => {
		const expectedRandomCityId = 'random-city-id';
		const withHistoryComponent = withHistory(<RandomCity />, mockHistory);

		render(withHistoryComponent);

		expect(screen.getByTestId(expectedRandomCityId)).toBeInTheDocument();
	});
});
