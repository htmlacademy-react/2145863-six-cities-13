import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createFakeStore } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import LeafletMap from './leaflet-map';

describe('Component: LeafletMap', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly', () => {
		const block = 'offer';
		const withHistoryComponent = withHistory(<LeafletMap block={block}/>, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore());
		const expectedLeafletTestId = 'leaflet-testid';
		const expectedClass = `${block}__map map`;

		render(withStoreComponent);

		expect(screen.getByTestId(expectedLeafletTestId)).toBeInTheDocument();
		expect(screen.getByTestId(expectedLeafletTestId)).toHaveClass(expectedClass);
	});
});
