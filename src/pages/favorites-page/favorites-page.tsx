import { Helmet } from 'react-helmet-async';
import type { ServerOffer } from '../../types/offer';
import CardFavorite from '../../components/card-favorite/card-favorite';
import { filterDuplicates, stringCompare } from '../../utils/common';
import Header from '../../components/header/header';
import { useDocumentTitle } from '../../hooks';

type FavoritesPageProps = {
	offers: ServerOffer[];
}

function FavoritesPage({offers}: FavoritesPageProps): React.JSX.Element {
	const favoriteOffers = offers
	.filter((offer) => offer.isFavorite)
	.sort((a, b) => stringCompare(a.city.name, b.city.name));
	const cities = favoriteOffers
	.map((offer) => offer.city.name)
	.filter(filterDuplicates);

	useDocumentTitle(`favorite places (${favoriteOffers.length})` );

	return (
		<div className="page">
			<Header favoriteAmount={favoriteOffers.length} />

			<main className="page__main page__main--favorites">
				<div className="page__favorites-container container">
					<section className="favorites">
						<h1 className="favorites__title">Saved listing</h1>
						<ul className="favorites__list">


							{ cities.length &&
								cities.map((city) => (
										// TODO: Добавить текущий <div className="favorites__locations locations locations--current">
									<li className="favorites__locations-items" key={city}>
										<div className="favorites__locations locations">
											<div className="locations__item">
												<a className="locations__item-link" href="#">
													<span>{city}</span>
												</a>
											</div>
										</div>
										<div className="favorites__places">
											{favoriteOffers
												.filter((offer) => offer.city.name === city)
												.map((offer) => {
												return (
													<CardFavorite offer={offer} key={offer.id} />
												);
											})}
										</div>
									</li>
								))
							}

						</ul>
					</section>
				</div>
			</main>
			<footer className="footer container">
				<a className="footer__logo-link" href="main.html">
					<img
						className="footer__logo"
						src="img/logo.svg"
						alt="6 cities logo"
						width={64}
						height={33}
					/>
				</a>
			</footer>
		</div>
	);
}

export default FavoritesPage;
