import type { ServerOffer,	ServerFullOffer, ServerCommentWithOfferId} from '../types/offer';
import { TemporalData } from '../constants';
import { createMockOffer } from './mock-offers';
import { createFullMockOffer } from './mock-fulloffers';
import { createMockReviw } from './mock-reviws';
import { faker } from '@faker-js/faker';

/** Моковый список предложений по недвижимости */
const offers: ServerOffer[] = Array.from({length: TemporalData.OfferAmount}, createMockOffer);

/** Моковый список полной информации по предложениям недвижимости */
const fullOffers: ServerFullOffer[] = offers.map((offer) => createFullMockOffer(offer));

/** Моковый список отзывов */
const reviews: ServerCommentWithOfferId[] = [];
offers.forEach((offer) => {
	const commnetsAmoutn = faker.number.int({min: 0, max: TemporalData.CommentMaxAmount});

	for (let i = 0; i < commnetsAmoutn; i++) {
		reviews.push({...createMockReviw(), offerId: offer.id});
	}
});

/** Моковый список предложений по соседству */
function getMockNeighbourPlaces(): ServerOffer[] {
	const placesAmount = faker.number.int({min: 3, max: 6});
	const places = Array.from(
		{length: placesAmount},
		(): ServerOffer => ({...offers[Math.floor(Math.random() * offers.length)]})
	);

	return places;
}

export {offers, fullOffers, reviews, getMockNeighbourPlaces}
