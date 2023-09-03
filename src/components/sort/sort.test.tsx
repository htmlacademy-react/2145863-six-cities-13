import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createFakeStore } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import Sort from './sort';
import { DEFAULT_CITY, NameSpace, SortMethod } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { SortMap } from '../../utils/convert';

describe('Component: Sort', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly', () => {
		const expectedCaptionText = 'Sort by';
		const expectedActiveSortId = 'active-sort-id';
		const activeSort = SortMethod.PriceToHigh;
		const expectedSortType = SortMap[activeSort].title;
		const withHistoryComponent = withHistory(<Sort />, mockHistory);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			createFakeStore({
				[NameSpace.Offers]: {
					city: DEFAULT_CITY,
					sort: activeSort as string,
					activeOffer: null,
					allOffers: [],
					allOffersFetchingStatus: RequestStatus.Idle,
				},
			})
		);

		render(withStoreComponent);

		expect(screen.getByText(expectedCaptionText)).toBeInTheDocument();
		expect(screen.getByTestId(expectedActiveSortId).textContent).toBe(expectedSortType);
	});
});
