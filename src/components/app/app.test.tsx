import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import App from './app';
import { createFakeStore } from '../../utils/mocks';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { render, screen } from '@testing-library/react';
import { RequestStatus } from '../../constants/common';

describe('Application Routing', () => {
	let mockHistory: MemoryHistory;
	window.scrollTo = vi.fn(() => null);

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render "MainPage" when user navigate to "/"', () => {
		const withHistoryComponent = withHistory(<App isTestMode />, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore());
		mockHistory.push(AppRoute.Main);
		const expectedPageId = 'main-page';

		render(withStoreComponent);

		expect(screen.getByTestId(expectedPageId)).toBeInTheDocument();
	});

	it('should render "OfferPage" when user navigate to "/offer:offerId"', () => {
		const withHistoryComponent = withHistory(<App isTestMode />, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore());
		mockHistory.push(AppRoute.Favorites);
		const expectedPageId = 'favorite-page';

		render(withStoreComponent);

		expect(screen.getByTestId(expectedPageId)).toBeInTheDocument();
	});

	it('should render "LoginPage" when user navigate to "/login" and "authorizationStatus === NoAuth"', () => {
		const withHistoryComponent = withHistory(<App isTestMode />, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore({
			USER: {authorizationStatus: AuthorizationStatus.NoAuth, loginSendingStatus: RequestStatus.Idle, user: null}
		}));
		mockHistory.push(AppRoute.Login);
		const expectedPageId = 'login-page';

		render(withStoreComponent);

		expect(screen.getByTestId(expectedPageId)).toBeInTheDocument();
	});

	it('should render "MainPage" when user navigate to "/login" and "authorizationStatus === Auth"', () => {
		const withHistoryComponent = withHistory(<App isTestMode />, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore({
			USER: {authorizationStatus: AuthorizationStatus.Auth, loginSendingStatus: RequestStatus.Idle, user: null}
		}));
		mockHistory.push(AppRoute.Login);
		const expectedPageId = 'main-page';

		render(withStoreComponent);

		expect(screen.getByTestId(expectedPageId)).toBeInTheDocument();
	});

	it('should render "Login" when user navigate to "/favorites" and "authorizationStatus === NoAuth"', () => {
		const withHistoryComponent = withHistory(<App isTestMode />, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore({
			USER: {authorizationStatus: AuthorizationStatus.NoAuth, loginSendingStatus: RequestStatus.Idle, user: null}
		}));
		mockHistory.push(AppRoute.Favorites);

		const expectedPageId = 'login-page';

		render(withStoreComponent);

		expect(screen.getByTestId(expectedPageId)).toBeInTheDocument();
	});

	it('should render "Favorites" when user navigate to "/favorites" and "authorizationStatus === Auth"', () => {
		const withHistoryComponent = withHistory(<App isTestMode />, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore({
			USER: {authorizationStatus: AuthorizationStatus.Auth, loginSendingStatus: RequestStatus.Idle, user: null}
		}));
		mockHistory.push(AppRoute.Favorites);
		const expectedPageId = 'favorite-page';

		render(withStoreComponent);

		expect(screen.getByTestId(expectedPageId)).toBeInTheDocument();
	});

	it('should render "Page404" when user navigate to "/not-found"', () => {
		const withHistoryComponent = withHistory(<App isTestMode />, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore());
		mockHistory.push(AppRoute.NotFound);
		const expectedPageId = 'notfound-page';

		render(withStoreComponent);

		expect(screen.getByTestId(expectedPageId)).toBeInTheDocument();
	});

	it('should render "Page404" when user navigate to "*"', () => {
		const withHistoryComponent = withHistory(<App isTestMode />, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore());
		const unknownRoute = '/unknown-route';
		mockHistory.push(unknownRoute);
		const expectedPageId = 'notfound-page';

		render(withStoreComponent);

		expect(screen.getByTestId(expectedPageId)).toBeInTheDocument();
	});
});
