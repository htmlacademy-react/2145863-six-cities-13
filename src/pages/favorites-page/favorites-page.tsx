import CardFavorite from '../../components/card-favorite/card-favorite';
import Header from '../../components/header/header';
import { useAppSelector, useDocumentTitle } from '../../hooks';
import { ULink } from '../../components/u-link/u-link';
import { AppRoute } from '../../constants';
import { convertOffersToOffersByCity } from '../../utils/convert';
import { RequestStatus } from '../../constants/common';
import ErrorElement from '../../components/error-element/error-element';
import { ErrorCause } from '../../constants/errors';
import LoadingScreen from '../loading-screen/loading-screen';
import { getFavoriteAmount, getFavoritesFetchingStatus, getFavorites } from '../../store/favorites/favorites.selectors';
import Card from '../../components/card/card';
import EmptyFavorite from '../../components/empty-favorite/empty-favorite';
import clsx from 'clsx';

function FavoritesPage(): React.JSX.Element {
	console.log('favorites-page');
	const favoriteAmount = useAppSelector(getFavoriteAmount);
	const fetchingStatus = useAppSelector(getFavoritesFetchingStatus);
	const favorites = useAppSelector(getFavorites);
	const isEmpty = favorites?.length === 0  || favorites === undefined;
	useDocumentTitle(`favorite places (${favoriteAmount})`);

	const offersByCity = convertOffersToOffersByCity(favorites);
	const cities = Object.keys(offersByCity);
	const pageClass = clsx(
		'page',
		isEmpty && 'page--favorites-empty'
	);
	const mainClass = clsx(
		'page__main page__main--favorites',
		isEmpty && 'page__main--favorites-empty'
	);

	console.log({fetchingStatus, favorites});
	return (
		<div className={pageClass}>
			<Header />

			<main className={mainClass}>
				<div className="page__favorites-container container">
				{fetchingStatus === RequestStatus.Error && <ErrorElement cause={ErrorCause.FetchFavorites}/>}
				{fetchingStatus === RequestStatus.Pending && <LoadingScreen />}
				{fetchingStatus === RequestStatus.Success && isEmpty && <EmptyFavorite />};
				{fetchingStatus === RequestStatus.Success && !isEmpty && (
					<section className="favorites ">
						<h1 className="favorites__title">Saved listing</h1>
						<ul className="favorites__list">
							{cities.map((city) => (
								<li className="favorites__locations-items" key={city}>
									<div className="favorites__locations locations locations--current">
										<div className="locations__item">
											<ULink className="locations__item-link" href={`${AppRoute.Main}?filter=${city}`}>
												<span>{city}</span>
											</ULink>
										</div>
									</div>
									<div className="favorites__places">
										{offersByCity[city].map((offer) => (
											<Card block='favorites' offer={offer} key={offer.id} />
										))}
									</div>
								</li>
							))}
						</ul>
					</section>
				)}
				</div>
			</main>
			<footer className="footer container">
				<ULink className="footer__logo-link" href={AppRoute.Main}>
					<img
						className="footer__logo"
						src="img/logo.svg"
						alt="6 cities logo"
						width={64}
						height={33}
					/>
				</ULink>
			</footer>
		</div>
	);
}

export default FavoritesPage;
