import React from 'react';
import MainPage, { loader as mainPageLoader } from '../../pages/main-page/main-page';
import FavoritesPage, { loader as favoritesPageLoader } from '../../pages/favorites-page/favorites-page';
import OfferPage, { loader as offerPageLoader } from '../../pages/offer-page/offer-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesEmptyPage from '../../pages/favorites-empty-page/favorites-empty-page';
import Page404 from '../../pages/page-404/page-404';
import { PrivateRoute, PublicRoute } from '../../pages/access-rout/access-rout';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

import './stable-width.css';

function App(): React.JSX.Element {
	const authorizationStatus = AuthorizationStatus.Auth;

	const router = createBrowserRouter([{
			element: <ScrollToTop />,
			errorElement: <Page404/>,
			children: [
				{
					path: AppRoute.Root,
					element: (
						<MainPage status={authorizationStatus} />
					),
					loader: mainPageLoader,
				},
				{
					path: AppRoute.Favorites,
					element: (<PrivateRoute status={authorizationStatus} />),
					children: [
						{
							index: true,
							element: (<FavoritesPage status={authorizationStatus} />),
							loader: favoritesPageLoader,
						}
					]
				},
				{
					path: AppRoute.Login,
					element: <PublicRoute status={authorizationStatus} />,
					children: [
						{
							index: true,
							element: <LoginPage />,
						}
					]
				},
				{
					path: AppRoute.Offer,
					element: (
						<OfferPage status={authorizationStatus}/>
					),
					loader: offerPageLoader,
				},
				{
					path: '/favorites-empty',
					element: (
						<FavoritesEmptyPage />
					)
				},
			]
		}
	]);

	return <RouterProvider router={router} />;
}

export default App;
