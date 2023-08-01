import type { ServerOffer,	ServerFullOffer, ServerCommentWithOfferId} from '../types/offer';
import { TemporalData } from '../constants';
import { createMockOffer } from './mock-offers';
import { createFullMockOffer } from './mock-full-offers';
import { createMockReview } from './mock-reviews';
import { faker } from '@faker-js/faker';

/** Моковый список предложений по недвижимости */
const offers: ServerOffer[] = Array.from({length: TemporalData.OfferAmount}, createMockOffer);

/** Моковый список полной информации по предложениям недвижимости */
const fullOffers: ServerFullOffer[] = offers.map((offer) => createFullMockOffer(offer));

/** Моковый список отзывов */
const reviews: ServerCommentWithOfferId[] = [];
offers.forEach((offer) => {
	const commentsAmount = faker.number.int({min: 0, max: TemporalData.CommentMaxAmount});

	for (let i = 0; i < commentsAmount; i++) {
		reviews.push({...createMockReview(), offerId: offer.id});
	}
});

export {offers, fullOffers, reviews};
export {getMockNeighborPlaces} from './mock-neigbourhoods-places';
