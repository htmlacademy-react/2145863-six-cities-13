import type { ServerFullOffer, ServerOffer } from '../../types/offer';
import React from 'react';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesEmptyPage from '../../pages/favorites-empty-page/favorites-empty-page';
import Page404 from '../../pages/page-404/page-404';
import { PrivateRoute, PublicRoute } from '../../pages/access-rout/access-rout';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';

type AppProps = {
	offers: ServerOffer[];
	fullOffers: ServerFullOffer[];
};

function App({offers, fullOffers} : AppProps): React.JSX.Element {
	const authorizationStatus = AuthorizationStatus.Auth;

	const router = createBrowserRouter([
		{
			path: AppRoute.root,
			element: (
				<MainPage status={authorizationStatus} offers={offers} />
			),
		},
		{
			path: AppRoute.favorites,
			element: (
				<PrivateRoute status={authorizationStatus}>
					<FavoritesPage offers={offers} status={authorizationStatus} />
				</PrivateRoute>
			)
		},
		{
			path: AppRoute.login,
			element: (
					<PublicRoute status={authorizationStatus}>
						<LoginPage />
					</PublicRoute>
			)
		},
		{
			path: AppRoute.offer,
			element: (
				<OfferPage fullOffers={fullOffers} status={authorizationStatus}/>
			)
		},
		{
			path: '/favorites-empty',
			element: (
				<FavoritesEmptyPage />
			)
		},
		{
			path: '*', // 404
			element: (
				<Page404 />
			)
		}
	]);

	return <RouterProvider router={router}/>
}

export default App;
