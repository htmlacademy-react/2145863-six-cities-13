import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import FavoritesEmptyPage from '../../pages/favorites-empty-page/favorites-empty-page';
import OfferNotLoggedPage from '../../pages/offer-not-logged-page/offer-not-logged-page';
import Page404 from '../../pages/page-404/page-404';
import { PrivateRoute, PublicRoute } from '../../pages/access-rout/access-rout';
import type { ServerFullOffer, ServerOffer } from '../../types/offer';



type AppProps = {
	offers: ServerOffer[];
	fullOffers: ServerFullOffer[];
};

function App({offers, fullOffers} : AppProps): React.JSX.Element {
	const authorizationStatus = AuthorizationStatus.Auth;

	return (
			<BrowserRouter>
				<Routes>
						{/* main-page */}
					<Route
						path={AppRoute.root}
						element={<MainPage status={authorizationStatus} offers={offers}/> }
					/>
						{/* favirites */}
					<Route
						path={AppRoute.favorites}
						element={
							<PrivateRoute status={authorizationStatus}>
								<FavoritesPage offers={offers} />
							</PrivateRoute>
						}
					/>
						{/* login */}
					<Route
						path={AppRoute.login}
						element={
							<PublicRoute status={authorizationStatus}>
								<LoginPage />
							</PublicRoute>
						}
					/>
						{/* offer-page */}
					<Route
						path={AppRoute.offer}
						element={<OfferPage fullOffers={fullOffers} status={authorizationStatus}/>}
					/>
						{/* test - favorites-empty */}
					<Route
						path={'/favorites-empty'}
						element={<FavoritesEmptyPage />}
					/>
						{/* 404 */}
					<Route
						path='*'
						element={<Page404 />}
					/>
				</Routes>
			</BrowserRouter>
	);
}

export default App;
