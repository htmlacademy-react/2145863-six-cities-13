import React from 'react';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import LoginPage from '../../pages/login-page/login-page';
import Page404 from '../../pages/page-404/page-404';
import { PrivateRoute, PublicRoute } from '../../pages/access-route/access-route';
import { AppRoute, NameSpace } from '../../constants';
import { Route, Routes } from 'react-router-dom';

import './stable-width.css';
import { useAppSelector } from '../../hooks';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';

function App(): React.JSX.Element {
	const authorizationStatus = useAppSelector((state) => state[NameSpace.User].authorizationStatus);

		return  (

		<HistoryRouter history={browserHistory}>
			<Routes>
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
							index={true}
							element={<LoginPage />}
						/>
				</Route>
				<Route
					path={AppRoute.Favorites}
					element={<PrivateRoute status={authorizationStatus}/>}
				>
						<Route
							index={true}
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
			</Routes>
		</HistoryRouter>
	);
}

export default App;
