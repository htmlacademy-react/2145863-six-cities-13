import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { withHistory } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './access-route';
import { render, screen } from '@testing-library/react';

describe('Component: PrivateRoute', () => {
	let mockHistory: MemoryHistory;

	beforeAll(() => {
		mockHistory = createMemoryHistory();
	});

	beforeEach(() => {
		mockHistory.push(AppRoute.Favorites);
	});

	it('should render component for public route, when user not authorized', () => {
		const expectedText = 'public route';
		const notExpectedText = 'private route';
		/** заглушка (упрощенный вариант роутинга без лишних зависимостей) */
		const preparedComponent = withHistory(
			<Routes>
				<Route path={AppRoute.Login} element={<span>{expectedText}</span>}></Route>
				<Route
					path={AppRoute.Favorites}
					element={<PrivateRoute status={AuthorizationStatus.NoAuth}/>}
				>
					<Route
						index
						element={<span>{notExpectedText}</span>}
					/>
				</Route>
			</Routes>,
			mockHistory
		);

		render(preparedComponent);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
		expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
	});

	it('should not render component for public route, when user is authorized', () => {
		const expectedText = 'private route';
		const notExpectedText = 'public route';
		/** заглушка (упрощенный вариант роутинга без лишних зависимостей) */
		const preparedComponent = withHistory(
			<Routes>
				<Route path={AppRoute.Login} element={<span>{notExpectedText}</span>}></Route>
				<Route
					path={AppRoute.Favorites}
					element={<PrivateRoute status={AuthorizationStatus.Auth}/>}
				>
					<Route
						index
						element={<span>{expectedText}</span>}
					/>
				</Route>
			</Routes>,
			mockHistory
		);

		render(preparedComponent);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
		expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();

	});

});
