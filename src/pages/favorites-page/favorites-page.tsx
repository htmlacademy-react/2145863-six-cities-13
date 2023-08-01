import type {LoaderResponse} from './favorites-page-loader';
import CardFavorite from '../../components/card-favorite/card-favorite';
import Header from '../../components/header/header';
import { useDocumentTitle } from '../../hooks';
import { ULink } from '../../components/u-link/u-link';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useLoaderData } from 'react-router-dom';

type FavoritesPageProps = {
	status: AuthorizationStatus;
}

function FavoritesPage({status}: FavoritesPageProps): React.JSX.Element {
	const isAuthorized = status === AuthorizationStatus.Auth;
	const {offersByCity, favoriteAmount, cities} = useLoaderData() as LoaderResponse;

	useDocumentTitle(`favorite places (${favoriteAmount})`);

	return (
		<div className="page">
			<Header isAuthorized={isAuthorized} />

			<main className="page__main page__main--favorites">
				<div className="page__favorites-container container">
					<section className="favorites">
						<h1 className="favorites__title">Saved listing</h1>
						<ul className="favorites__list">

							{ cities.map((city) => (
								<li className="favorites__locations-items" key={city}>
									<div className="favorites__locations locations locations--current">
										<div className="locations__item">
											<ULink className="locations__item-link" href={`${AppRoute.Root}?filter=${city}`}>
												<span>{city}</span>
											</ULink>
										</div>
									</div>
									<div className="favorites__places">
										{offersByCity[city].map((offer) => (
											<CardFavorite offer={offer} key={offer.id} />
										))}
									</div>
								</li>
							))}

						</ul>
					</section>
				</div>
			</main>
			<footer className="footer container">
				<ULink className="footer__logo-link" href={AppRoute.Root}>
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
