import type { OffersByCity, ServerOffer } from '../../types/offer';
import Header from '../../components/header/header';
import LocationsList from '../../components/location-list/location-list';
import OfferList from '../../components/offer-list/offer-list';
import Sort from '../../components/sort/sort';
import { useDocumentTitle } from '../../hooks';
import { AuthorizationStatus, CITIES } from '../../constants';
import { getOfferList } from '../../model';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { converOffersToOffersByCity } from '../../utils/convert';

type LoaderResponse = {
	cities: string[];
	offersByCity: OffersByCity;
	favoriteAmount: number;
}

type MainPageProps = {
	/** статус авторизации */
	status: AuthorizationStatus;
};

/**
 * Компонент главного экрана
 */
function MainPage({status}: MainPageProps): React.JSX.Element {

	const isAuthorized = status === AuthorizationStatus.Auth;
	const {cities, offersByCity, favoriteAmount} = useLoaderData() as LoaderResponse;
	const [searchParams, setSearchParams] = useSearchParams();
	const initialCity = searchParams.get('filter') || cities[0];
	const [currentCity, setCurrentCity] = useState(initialCity);

	useDocumentTitle('Main');

	function handleTabClick(city: string) {
		setSearchParams({...searchParams, filter: city});
		setCurrentCity(city);
	}

	return (
		<div className="page page--gray page--main">

			<Header favoriteAmount={favoriteAmount} isAuthorized={isAuthorized}/>

			<main className="page__main page__main--index">
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<LocationsList
							cities={cities}
							currentCity={currentCity}
							handleTabClick={handleTabClick}
						/>
					</section>
				</div>
				<div className="cities">
					<div className="cities__places-container container">
						<section className="cities__places places">
							<h2 className="visually-hidden">Places</h2>
							<b className="places__found">{offersByCity[currentCity].length} places to stay in {currentCity}</b>
							<Sort />
							<OfferList offers={offersByCity[currentCity]} />
						</section>
						<div className="cities__right-section">
							<section className="cities__map map"></section>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

function loader(): LoaderResponse {
	const offers = getOfferList();
	const favoriteAmount = offers.filter((offer) => offer.isFavorite).length;

	return {
		cities: Array.from(CITIES),
		offersByCity: converOffersToOffersByCity(offers),
		favoriteAmount,
	};

}

export default MainPage;
export {loader};
