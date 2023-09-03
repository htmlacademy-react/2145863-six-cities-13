import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createFakeStore } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import Header from './header';
import { AuthorizationStatus, NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';

describe('Component: Header', () => {
	let mockHistory: MemoryHistory;
	const mockUser = {
		name: 'Oliver Conner',
		avatarUrl: 'https://url-to-image/image.png',
		isPro: false,
		email: 'Oliver.conner@gmail.com',
		token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
	};

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly', () => {
		vi.mock('../logo/logo', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked Logo Component</div>),
		}));
		const expectedHeaderId = 'header';
		const withHistoryComponent = withHistory(<Header />, mockHistory);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			createFakeStore({
				[NameSpace.User]: {
					authorizationStatus: AuthorizationStatus.Auth,
					loginSendingStatus: RequestStatus.Idle,
					user: mockUser,
				},
			})
		);
		const expectedAvatarId = 'avatar-id';
		const expectedEmail = mockUser.email;
		const expectedFavoriteAmountId = 'favorite-amount';
		const expectedFavoriteAmount = '0';
		const expectedSingnText = 'Sign out';

		render(withStoreComponent);

		expect(screen.getByTestId(expectedHeaderId)).toBeInTheDocument();
		expect(screen.getByText('Mocked Logo Component')).toBeInTheDocument();
		expect(screen.getByTestId(expectedAvatarId)).toBeInTheDocument();
		expect(screen.getByText(expectedEmail)).toBeInTheDocument();
		expect(screen.getByTestId(expectedFavoriteAmountId)).toHaveTextContent(expectedFavoriteAmount);
		expect(screen.getByText(expectedSingnText)).toBeInTheDocument();
	});
});
