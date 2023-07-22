import { fullOffers, offers, reviews, getMockNeighbourPlaces } from "../mocks";
import type { ServerFullOffer, ServerOffer, ServerCommentWithOfferId } from "../types/offer";


function getOffersList(): ServerOffer[] | undefined {
	return offers;
}

function getFullOffer(offerId: string): ServerFullOffer | undefined {
	return fullOffers.find((offer) => offer.id === offerId);
}

function getFavorites(): ServerOffer[] | undefined {
	return getOffersList()?.filter((offer) => offer.isFavorite);
}

function getReviews(): ServerCommentWithOfferId[] | undefined {
	return reviews;
}

function getNeighbourPlaces(): ServerOffer[] {
	return getMockNeighbourPlaces();
}

export {
	getOffersList,
	getFullOffer,
	getFavorites,
	getReviews,
	getNeighbourPlaces,
};
