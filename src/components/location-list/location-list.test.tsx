import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createFakeStore } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import LocationsList from './location-list';
import { CITIES } from '../../constants';

describe('Component: LocationsList', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly', () => {
		const cities = Array.from(CITIES);
		const expectedCitiesCount = cities.length;
		const expectedCityElementId = 'city-element';
		const withHistoryComponent = withHistory(<LocationsList cities={cities}/>, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore());

		render(withStoreComponent);
		const citiesCount = screen.getAllByTestId(expectedCityElementId).length;

		expect(citiesCount).toBe(expectedCitiesCount);
	});
});
