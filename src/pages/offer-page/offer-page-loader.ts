import { getFullOffer, getNeighbourPlaces, getReviews } from '../../model';
import type { ServerFullOffer, ServerOffer, ServerRewiew } from '../../types/offer';
import type { LoaderFunctionArgs } from 'react-router-dom';

export type LoaderResponse = {
	offer: ServerFullOffer;
	offerReviwes: ServerRewiew[];
	neighbourPlaces: ServerOffer[];
}

function loader({params}: LoaderFunctionArgs): LoaderResponse | Response {
	const offerId = params.id;

	if (offerId === undefined) {
		throw new Response('Not found', {status: 404});
	}

	const offer = getFullOffer(offerId ?? '');
	const offerReviwes = getReviews()
		?.filter((review) => review.offerId === offerId);

	if (offer === undefined) {
		throw new Response('Not found', {status: 404});
	}

	return {
		offer,
		offerReviwes,
		neighbourPlaces: getNeighbourPlaces(offer.id),
	};
}

export {loader};
