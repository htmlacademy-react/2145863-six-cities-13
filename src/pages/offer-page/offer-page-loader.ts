import { getFullOffer, getNeighborPlaces, getReviews } from '../../model';
import type { ServerFullOffer, ServerOffer, ServerReview } from '../../types/offer';
import type { LoaderFunctionArgs } from 'react-router-dom';

export type LoaderResponse = {
	offer: ServerFullOffer;
	offerReviews: ServerReview[];
	neighbourPlaces: ServerOffer[];
}

function loader({params}: LoaderFunctionArgs): LoaderResponse | Response {
	const offerId = params.id;

	if (offerId === undefined) {
		throw new Response('Not found', {status: 404});
	}

	const offer = getFullOffer(offerId ?? '');
	const offerReviews = getReviews()
		?.filter((review) => review.offerId === offerId);

	if (offer === undefined) {
		throw new Response('Not found', {status: 404});
	}

	return {
		offer,
		offerReviews: offerReviews,
		neighbourPlaces: getNeighborPlaces(offer.id),
	};
}

export {loader};
