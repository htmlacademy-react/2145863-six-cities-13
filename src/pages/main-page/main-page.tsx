import Header from '../../components/header/header';
import LocationsList from '../../components/location-list/location-list';
import OfferList from '../../components/offer-list/offer-list';
import Sort from '../../components/sort/sort';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import { useAppDispatch, useAppSelector, useDocumentTitle } from '../../hooks';
import { CITIES, NameSpace } from '../../constants';
import clsx from 'clsx';
import { useEffect } from 'react';
import { offersActions } from '../../store/offers/offers.slice';
import { RequestStatus } from '../../constants/common';
import LoadingScreen from '../loading-screen/loading-screen';
import ErrorElement, { ErrorMessage } from '../../components/error-element/error-element';
import { ErrorCause } from '../../constants/errors';
import { toast } from 'react-toastify';

/**
 * Компонент главного экрана
 */
function MainPage(): React.JSX.Element {

	const dispatch = useAppDispatch();
	const cities = Array.from(CITIES);
	const offersLoadedStatus = useAppSelector((store) => store.OFFERS.allOffersFetchingStatus);

	useDocumentTitle('Main');

	useEffect(() => {
		if (offersLoadedStatus === RequestStatus.Success) {
			dispatch(offersActions.fillOfferList());
		}
	}, [dispatch, offersLoadedStatus]);
	const currentCity = useAppSelector((state) => state[NameSpace.Offers].city);
	const offers = useAppSelector((state) => state[NameSpace.Offers].offerList);
	const isEmpty = offers.length === 0 ;

	// const [searchParams, setSearchParams] = useSearchParams();
	// TODO: надо переделать инициализацию с учётом store.city
	// const initialCity = searchParams.get('filter') || cities[0];

	// На данный момент не вызывается
	// function handleTabClick(city: string) {
	// TODO: вызывает двойную перерисовку страницы
	// setSearchParams({...searchParams, filter: city});
	// setCurrentCity(city);
	// }
	// eslint-disable-next-line no-console
	// console.log('re-draw. current city: ', currentCity);

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

			{ offersLoadedStatus === RequestStatus.Error && <ErrorElement cause={ErrorCause.FetchOffers}  /> }
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
											<b className="places__found">{offers.length} places to stay in {currentCity}</b>
											<Sort />
											<OfferList />
										</section>
										<div className="cities__right-section">
											<LeafletMap
												block="cities"
											/>
										</div>
									</>
									:
									<>
										<section className="cities__no-places">
											<div className="cities__status-wrapper tabs__content">
												<b className="cities__status">No places to stay available</b>
												<p className="cities__status-description">
												We could not find any property available at the moment in&nbsp;
													{currentCity}
												</p>
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
