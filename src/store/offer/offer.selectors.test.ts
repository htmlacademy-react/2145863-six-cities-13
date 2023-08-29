import { describe } from 'vitest';
import { NameSpace } from '../../constants';
import { createFullMockOffer, createMockOffer, createMockReview } from '../../utils/mocks';
import { RequestStatus } from '../../constants/common';
import { getNeighborPlaces, getOffer, getOfferFetchingStatus, getReviewSendingStatus, getReviews, getReviewsFetchingStatus } from './offer.selectors';

describe('Offer selectors', () => {
	const state = {
		[NameSpace.Offer]: {
			offer: createFullMockOffer(),
			offerFetchingStatus: RequestStatus.Pending,
			neighborPlaces: [createMockOffer(), createMockOffer()],
			reviews: [createMockReview(), createMockReview()],
			reviewsFetchingStatus: RequestStatus.Error,
			reviewSendingStatus: RequestStatus.Success,
		},
	};

	it('should return neighborPlaces from state', () => {
		const {neighborPlaces} = state[NameSpace.Offer];
		const result = getNeighborPlaces(state);
		expect(result).toEqual(neighborPlaces);
	});

	it('should return offer from state', () => {
		const {offer} = state[NameSpace.Offer];
		const result = getOffer(state);
		expect(result).toEqual(offer);
	});

	it('should return offerFetchingStatus from state', () => {
		const {offerFetchingStatus} = state[NameSpace.Offer];
		const result = getOfferFetchingStatus(state);
		expect(result).toBe(offerFetchingStatus);
	});

	it('should return reviewSendingStatus from state', () => {
		const {reviewSendingStatus} = state[NameSpace.Offer];
		const result = getReviewSendingStatus(state);
		expect(result).toBe(reviewSendingStatus);
	});
	it('should return reviews from state', () => {
		const {reviews} = state[NameSpace.Offer];
		const result = getReviews(state);
		expect(result).toEqual(reviews);
	});

	it('should return reviewsFetchingStatus from state', () => {
		const {reviewsFetchingStatus} = state[NameSpace.Offer];
		const result = getReviewsFetchingStatus(state);
		expect(result).toBe(reviewsFetchingStatus);
	});

});
