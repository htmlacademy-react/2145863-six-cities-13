import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import FavoritesEmptyPage from '../../pages/favorites-empty-page/favorites-empty-page';
import OfferNotLoggedPage from '../../pages/offer-not-logged-page/offer-not-logged-page';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import Page404 from '../../pages/page-404/page-404';

type AppProps = {
	totalPlaces: number;
	favoriteCount: number;
};

function App({totalPlaces, favoriteCount} : AppProps): React.JSX.Element {
	return (
		<HelmetProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path={AppRoute.root}
						element={<MainPage totalPlaces={totalPlaces} favoriteCount={favoriteCount}/>}
					/>
					<Route
						path={AppRoute.login}
						element={<LoginPage />}
					/>
					<Route
						path={AppRoute.offer}
						element={<OfferPage />}
					/>
					{/* test offer-not-logged */}
					<Route
						path={'/offer-not-logged'}
						element={<OfferNotLoggedPage />}
					/>
					<Route
						path={AppRoute.favorites}
						element={
							<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
								<FavoritesPage />
							</PrivateRoute>
						}
					/>
					{/* test - favorites-empty */}
					<Route
						path={'/favorites-empty'}
						element={<FavoritesEmptyPage />}
					/>
					<Route
						path='*'
						element={<Page404 />}
					/>
				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	);
}

export default App;
