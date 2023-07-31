import type { LoaderResponse } from './main-page-loader';
import Header from '../../components/header/header';
import LocationsList from '../../components/location-list/location-list';
import OfferList from '../../components/offer-list/offer-list';
import Sort from '../../components/sort/sort';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import { useAppSelector, useDocumentTitle } from '../../hooks';
import { AuthorizationStatus } from '../../constants';
import { useLoaderData } from 'react-router-dom';

type MainPageProps = {
	/** статус авторизации */
	status: AuthorizationStatus;
};

/**
 * Компонент главного экрана
 */
function MainPage({status}: MainPageProps): React.JSX.Element {
	useDocumentTitle('Main');
	const {cities, offersByCity} = useLoaderData() as LoaderResponse;
	const isAuthorized = status === AuthorizationStatus.Auth;

	// const [searchParams, setSearchParams] = useSearchParams();
	// TODO: надо переделать инициализацию с учтом store.city
	// const initialCity = searchParams.get('filter') || cities[0];
	const currentCity = useAppSelector((state) => state.city);

	// На данный момент не вызывается
	// function handleTabClick(city: string) {
	// TODO: вызывает двойную перерисовку страницы
	// setSearchParams({...searchParams, filter: city});
	// setCurrentCity(city);
	// }

	// eslint-disable-next-line no-console
	console.log('re-draw. current city: ', currentCity);

	return (
		<div className="page page--gray page--main">

			<Header isAuthorized={isAuthorized}/>

			<main className="page__main page__main--index">
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<LocationsList
							cities={cities}
						/>
					</section>
				</div>
				<div className="cities">
					<div className="cities__places-container container">
						<section className="cities__places places">
							<h2 className="visually-hidden">Places</h2>
							<b className="places__found">{offersByCity[currentCity].length} places to stay in {currentCity}</b>
							<Sort />
							<OfferList />
						</section>
						<div className="cities__right-section">
							<LeafletMap
								block="cities"
							/>
						</div>
					</div>
				</div>
			</main>

		</div>
	);
}

export default MainPage;
