import React from 'react';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import { loader as favoritesPageLoader } from '../../pages/favorites-page/favorites-page-loader';
import OfferPage from '../../pages/offer-page/offer-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesEmptyPage from '../../pages/favorites-empty-page/favorites-empty-page';
import Page404 from '../../pages/page-404/page-404';
import { PrivateRoute, PublicRoute } from '../../pages/access-route/access-route';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../constants';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

import './stable-width.css';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function App(): React.JSX.Element {
	const authorizationStatus = useAppSelector((state) =>
		state[NameSpace.User].AuthorizationStatus);
	const isDataLoading = useAppSelector((state) =>
		!!state[NameSpace.Data].dataLoadingStatus);

	if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoading) {
		return (
			<LoadingScreen />
		);
	}

	const router = createBrowserRouter([{
		element: <ScrollToTop />,
		errorElement: <Page404/>,
		children: [
			{
				path: AppRoute.Main,
				element: (
					<MainPage status={authorizationStatus} />
				),
			},
			{
				path: AppRoute.Favorites,
				element: (<PrivateRoute status={authorizationStatus} />),
				children: [
					{
						index: true,
						element: (<FavoritesPage status={authorizationStatus} />),
						// loader: favoritesPageLoader,
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
