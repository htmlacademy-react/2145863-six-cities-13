import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createFakeStore, createMockOffer } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import FavoritesPage from './favorites-page';
import { AuthorizationStatus, NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';

describe('Component: FavoritePage', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly two favorite offers', () => {
		vi.mock('../../components/card/card', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked Card Component</div>),
		}));
		const withHistoryComponent = withHistory(<FavoritesPage />, mockHistory);
		const {withStoreComponent} = withStore(
			withHistoryComponent,
			createFakeStore({
				[NameSpace.User]: {
					authorizationStatus: AuthorizationStatus.Auth,
					loginSendingStatus: RequestStatus.Idle,
					user: null,
				},
				[NameSpace.Favorites]: {
					favorites: [createMockOffer(), createMockOffer()],
					favoritesFetchingStatus: RequestStatus.Success,
					favoriteAmount: 2,
				}
			})
		);
		const expectedTestId = 'favorite-page';
		const expectedTitleText = 'Saved listing';

		render(withStoreComponent);

		expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
		expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
		expect(screen.getAllByText('Mocked Card Component')).toHaveLength(2);
	});
});
