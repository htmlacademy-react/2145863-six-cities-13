import React from 'react';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import LoginPage from '../../pages/login-page/login-page';
import Page404 from '../../pages/page-404/page-404';
import { AppRoute } from '../../constants';
import { PrivateRoute, PublicRoute } from '../../pages/access-route/access-route';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import { getAuthorizationStatus } from '../../store/user/user.selectors';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

import './stable-width.css';

function App(): React.JSX.Element {
	const authorizationStatus = useAppSelector(getAuthorizationStatus);

	return (

		<HistoryRouter history={browserHistory}>
			<Routes>
				<Route
					element={<ScrollToTop />}
				>
					<Route
						path={AppRoute.Main}
						element={<MainPage />}
					>
					</Route>
					<Route
						path={`${AppRoute.Offer}/:id`}
						element={<OfferPage />}
					/>
					<Route
						path={AppRoute.Login}
						element={<PublicRoute status={authorizationStatus}/>}
					>
						<Route
							index
							element={<LoginPage />}
						/>
					</Route>
					<Route
						path={AppRoute.Favorites}
						element={<PrivateRoute status={authorizationStatus}/>}
					>
						<Route
							index
							element={<FavoritesPage />}
						/>
					</Route>
					<Route
						path={AppRoute.NotFound}
						element={<Page404 />}
					/>
					<Route
						path="*"
						element={<Page404 />}
					/>
				</Route>


			</Routes>
		</HistoryRouter>
	);
}

export default App;
