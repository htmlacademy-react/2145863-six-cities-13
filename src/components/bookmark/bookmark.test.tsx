import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createFakeStore } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import Bookmark from './bookmark';

describe('Component: Bookmark', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly', () => {
		const supposedOfferId = 'test-offer-id';
		const supposedIsFavorite = true;
		const expectedLabel = 'In bookmarks';
		const withHistoryComponent = withHistory(
			<Bookmark offerId={supposedOfferId} isFavorite={supposedIsFavorite}/>,
			mockHistory
		);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore());

		render(withStoreComponent);

		expect(screen.getByText(expectedLabel)).toBeInTheDocument();
	});
});
