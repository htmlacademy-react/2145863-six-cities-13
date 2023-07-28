import { fullOffers, offers, reviews, getMockNeighbourPlaces } from '../mocks';
import type { ServerFullOffer, ServerOffer, ServerCommentWithOfferId } from '../types/offer';


function getOfferList(): ServerOffer[] {
	return offers;
}

function getFullOffer(offerId: string): undefined | ServerFullOffer {
	return fullOffers.find((offer) => offer.id === offerId);
}

function getFavorites(): ServerOffer[] {
	return getOfferList()?.filter((offer) => offer.isFavorite);
}

function getReviews(): ServerCommentWithOfferId[] {
	return reviews;
}

function getNeighbourPlaces(offerId: string): ServerOffer[] {
	return getMockNeighbourPlaces(offerId);
}

export {
	getOfferList,
	getFullOffer,
	getFavorites,
	getReviews,
	getNeighbourPlaces,
};
