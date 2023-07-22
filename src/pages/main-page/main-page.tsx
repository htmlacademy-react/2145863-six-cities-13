import { ServerOffer } from '../../types/offer';
import Header from '../../components/header/header';
import LocationsList from '../../components/location-list/location-list';
import OfferList from '../../components/offer-list/offer-list';
import Sort from '../../components/sort/sort';
import { useDocumentTitle } from '../../hooks';
import { AuthorizationStatus } from '../../constants';


type MainPageProps = {
	/** статус авторизации */
	status: AuthorizationStatus;
	/** список оферов для карточек */
	offers: ServerOffer[];
};

/**
 * Компонент главного экрана
 */
function MainPage({status, offers}: MainPageProps): React.JSX.Element {
	const favoriteAmount = offers.filter((offer) => offer.isFavorite).length;
	const isAuthorized = status === AuthorizationStatus.Auth;

	useDocumentTitle('Main');

	return (
		<div className="page page--gray page--main">

			<Header favoriteAmount={favoriteAmount} isAuthorized={isAuthorized}/>

			<main className="page__main page__main--index">
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<LocationsList />
					</section>
				</div>
				<div className="cities">
					<div className="cities__places-container container">
						<section className="cities__places places">
							<h2 className="visually-hidden">Places</h2>
							<b className="places__found">{offers.length} places to stay in Amsterdam</b>
							<Sort />
							<OfferList offers={offers} />
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

export default MainPage;
