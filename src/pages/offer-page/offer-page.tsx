import { useAppSelector, useDocumentTitle, useFetchOfferData } from '../../hooks';
import Header from '../../components/header/header';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';
import { MAX_NEIGHBOUR, RequestStatus } from '../../constants/common';
import { toast } from 'react-toastify';
import { ErrorCause } from '../../constants/errors';
import ErrorElement from '../../components/error-element/error-element';
import { getNeighborPlaces, getOffer, getOfferFetchingStatus } from '../../store/offer/offer.selectors';
import { getRandomUniqueElementsFromArray } from '../../utils/common';
import { ServerOffer } from '../../types/offer';
import OfferContent from '../../components/offer-content/offer-content';
import NeighbourPlaces from '../../components/neighbour-places/neighbour-places';

function OfferPage(): React.JSX.Element {
	const {id: offerId} = useParams();
	const offer = useAppSelector(getOffer);
	const fetchingStatus = useAppSelector(getOfferFetchingStatus);

	let neighbourPlaces = useAppSelector(getNeighborPlaces);
	neighbourPlaces = getRandomUniqueElementsFromArray<ServerOffer>(neighbourPlaces, MAX_NEIGHBOUR);

	useDocumentTitle(`Place: ${offer?.title || ''}`);
	useFetchOfferData(offerId);

	if (fetchingStatus === RequestStatus.Error && !location.href.lastIndexOf('not-found')) {
		toast.error(`offer:${offerId ?? ''} error ${ErrorCause.FetchOffer}`);
	}

	return (
		<div className="page">
			<Header />
			{fetchingStatus === RequestStatus.Error && <ErrorElement cause={ErrorCause.FetchOffer} offerId={offerId}/>}
			{fetchingStatus === RequestStatus.Pending && <LoadingScreen />}
			{fetchingStatus === RequestStatus.Success && offer && (
				<main data-testid="offer-page" className="page__main page__main--offer">
					<section className="offer">
						<OfferContent offer={offer} offerId={offerId}/>
						<LeafletMap
							block="offer"
							neighborhoodOffers={neighbourPlaces}
							baseOfferId={offer.id}
							baseOffer={offer}
						/>
					</section>
					<div className="container">
						{neighbourPlaces && <NeighbourPlaces places={neighbourPlaces}/>}
					</div>
				</main>
			)}

		</div>
	);
}

export default OfferPage;
