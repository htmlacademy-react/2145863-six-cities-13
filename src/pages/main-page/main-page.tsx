import Header from '../../components/header/header';
import LocationsList from '../../components/location-list/location-list';
import OfferList from '../../components/offer-list/offer-list';
import Sort from '../../components/sort/sort';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import { useActionCreators, useAppSelector, useDocumentTitle } from '../../hooks';
import { CITIES } from '../../constants';
import clsx from 'clsx';
import { DEFAULT_SORT, RequestStatus, SortMethod } from '../../constants/common';
import LoadingScreen from '../loading-screen/loading-screen';
import ErrorElement, { ErrorMessage } from '../../components/error-element/error-element';
import { ErrorCause } from '../../constants/errors';
import { toast } from 'react-toastify';
import { getAllOffers, getAllOffersFetchingStatus, getCity, getSort } from '../../store/offers/offers.selectors';
import { SortMap, getPluralPlaces } from '../../utils/convert';
import { useSearchParams } from 'react-router-dom';
import { offersActions } from '../../store/offers/offers.slice';
import { useEffect } from 'react';

/**
 * Компонент главного экрана
 */
function MainPage(): React.JSX.Element {
	useDocumentTitle('Main');
	const {setCity, setSort} = useActionCreators(offersActions);

	const cities = Array.from(CITIES);
	const currentCity = useAppSelector(getCity);
	const currenSort = useAppSelector(getSort);

	const offersLoadedStatus = useAppSelector(getAllOffersFetchingStatus);
	const rawOffers = useAppSelector(getAllOffers).slice();
	const offers = rawOffers
		.filter((offer) => offer.city.name === currentCity)
		.sort(SortMap[currenSort].sortFunc);
	const isEmpty = offers.length === 0;

	const [searchParams] = useSearchParams();
	const initialCity = searchParams.get('filter') || cities[0];
	const initialSort = searchParams.get('sort') || SortMethod[DEFAULT_SORT];

	useEffect(() => {
		if (initialCity !== currentCity) {
			setCity(initialCity);
		}
		if (initialSort !== currenSort) {
			setSort(initialSort);
		}
	}, [initialCity, initialSort, currentCity, currenSort, setCity, setSort]);

	const mainClass = clsx(
		'page__main page__main--index',
		{'page__main--index-empty': isEmpty},
	);

	const containerClass = clsx (
		'cities__places-container container',
		{'cities__places-container--empty': isEmpty},
	);

	if (offersLoadedStatus === RequestStatus.Error) {
		toast.warn(ErrorMessage[ErrorCause.FetchOffers]);
	}

	return (
		<div className="page page--gray page--main">

			<Header />

			{ offersLoadedStatus === RequestStatus.Error && <ErrorElement cause={ErrorCause.FetchOffers} /> }
			{ offersLoadedStatus === RequestStatus.Pending && <LoadingScreen/>}
			{ offersLoadedStatus === RequestStatus.Success && (
				<main className={mainClass}>
					<h1 className="visually-hidden">Cities</h1>
					<div className="tabs">
						<section className="locations container">
							<LocationsList
								cities={cities}
							/>
						</section>
					</div>
					<div className="cities">
						<div className={containerClass}>
							{
								!isEmpty
									?
									<>
										<section className="cities__places places">
											<h2 className="visually-hidden">Places</h2>
											<b className="places__found">{offers.length} {getPluralPlaces(offers.length, 'place')} to stay in {currentCity}</b>
											<Sort />
											<OfferList offers={offers}/>
										</section>
										<div className="cities__right-section">
											<LeafletMap
												block="cities"
												offers={offers}
											/>
										</div>
									</>
									:
									<>
										<section className="cities__no-places">
											<div className="cities__status-wrapper tabs__content">
												<b className="cities__status">No places to stay available</b>
												<p className="cities__status-description">We could not find any property available at the moment in {currentCity}</p>
											</div>
										</section>
										<div className="cities__right-section" />
									</>
							}
						</div>
					</div>
				</main>
			)}

		</div>
	);
}

export default MainPage;
