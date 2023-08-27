import Header from '../../components/header/header';
import LocationsList from '../../components/location-list/location-list';
import OfferList from '../../components/offer-list/offer-list';
import Sort from '../../components/sort/sort';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import { useAppSelector, useCities, useDocumentTitle } from '../../hooks';
import clsx from 'clsx';
import { RequestStatus } from '../../constants/common';
import LoadingScreen from '../loading-screen/loading-screen';
import ErrorElement, { ErrorMessage } from '../../components/error-element/error-element';
import { ErrorCause } from '../../constants/errors';
import { toast } from 'react-toastify';
import { getAllOffersFetchingStatus } from '../../store/offers/offers.selectors';
import { getPluralPlaces } from '../../utils/convert';
import { useOffers } from '../../hooks/use-offers/use-offers';
import EmptyMain from '../../components/empty-main/empty-main';

/**
 * Компонент главного экрана
 */
function MainPage(): React.JSX.Element {
	useDocumentTitle('Main');
	const {cities, currentCity, currentSort }: {cities: string[]; currentCity: string; currentSort: string} = useCities();
	const {offers, isEmpty} = useOffers(currentCity, currentSort);
	const offersLoadedStatus = useAppSelector(getAllOffersFetchingStatus);

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

			{offersLoadedStatus === RequestStatus.Error && (
				<ErrorElement cause={ErrorCause.FetchOffers} />
			)}
			{offersLoadedStatus === RequestStatus.Pending && <LoadingScreen />}
			{offersLoadedStatus === RequestStatus.Success && (
				<main className={mainClass}>
					<h1 className="visually-hidden">Cities</h1>
					<div className="tabs">
						<section className="locations container">
							<LocationsList cities={cities} />
						</section>
					</div>
					<div className="cities">
						<div className={containerClass}>
							{!isEmpty ? (
								<>
									<section className="cities__places places">
										<h2 className="visually-hidden">Places</h2>
										<b className="places__found">
											{offers.length} {getPluralPlaces(offers.length, 'place')}{' '}
											to stay in {currentCity}
										</b>
										<Sort />
										<OfferList offers={offers} />
									</section>
									<div className="cities__right-section">
										<LeafletMap block="cities" offers={offers} />
									</div>
								</>
							) : (
								<EmptyMain city={currentCity} />
							)}
						</div>
					</div>
				</main>
			)}
		</div>
	);
}

export default MainPage;
