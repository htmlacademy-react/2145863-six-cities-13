import { describe } from 'vitest';
import { RequestStatus } from '../../constants/common';
import { createFullMockOffer, createMockOffer, createMockReview } from '../../utils/mocks';
import { offerActions, offerReducer } from './offer.slice';
import { fetchNeighborsApiAction, fetchOfferApiAction, fetchReviewsApiAction, sendReviewApiAction } from '../api-actions';

describe ('Offer slice (reducer)', () => {

	const emptyAction = {type: ''};

	it('Should return initial state with empty action', () => {
		const expectedState = {
			offer: createFullMockOffer(),
			offerFetchingStatus: RequestStatus.Pending,
			neighborPlaces: [createMockOffer(), createMockOffer()],
			reviews: [createMockReview(), createMockReview()],
			reviewsFetchingStatus: RequestStatus.Error,
			reviewSendingStatus: RequestStatus.Success,
		};

		const result = offerReducer(expectedState, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should return default initial state with empty action and undefined state', () => {
		const expectedState = {
			offer: null,
			offerFetchingStatus: RequestStatus.Idle,
			neighborPlaces: [],
			reviews: [],
			reviewsFetchingStatus: RequestStatus.Idle,
			reviewSendingStatus: RequestStatus.Idle,
		};

		const result = offerReducer(undefined, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should drop reviewSendingStatus to Idle with "dropReviewSendingStatus" action', () => {
		const initialState = {
			offer: createFullMockOffer(),
			offerFetchingStatus: RequestStatus.Pending,
			neighborPlaces: [createMockOffer(), createMockOffer()],
			reviews: [createMockReview(), createMockReview()],
			reviewsFetchingStatus: RequestStatus.Error,
			reviewSendingStatus: RequestStatus.Success,
		};
		const expectedReviewSendingStatus = RequestStatus.Idle;

		const result = offerReducer(initialState, offerActions.dropReviewSendingStatus);

		expect(result.reviewSendingStatus).toBe(expectedReviewSendingStatus);
	});

	it('Should drop offer to null with "dropOffer" action', () => {
		const initialState = {
			offer: createFullMockOffer(),
			offerFetchingStatus: RequestStatus.Pending,
			neighborPlaces: [createMockOffer(), createMockOffer()],
			reviews: [createMockReview(), createMockReview()],
			reviewsFetchingStatus: RequestStatus.Error,
			reviewSendingStatus: RequestStatus.Success,
		};
		const expectedOffer = null;

		const result = offerReducer(initialState, offerActions.dropOffer);

		expect(result.offer).toBe(expectedOffer);
	});

	it('should set "offerFetchingStatus" to Pending with "fetchOfferApiAction.pending" action', () => {
		const expectedStatus = RequestStatus.Pending;
		const result = offerReducer(undefined, fetchOfferApiAction.pending);
		expect(result.offerFetchingStatus).toBe(expectedStatus);
	});

	it('should set "offerFetchingStatus" to Pending with "fetchOfferApiAction.fulfilled" action', () => {
		const expectedStatus = RequestStatus.Success;
		const data = createFullMockOffer();
		const payload = {offerId: 'test-offer-id'}

		const result = offerReducer(undefined, fetchOfferApiAction.fulfilled(data, '', payload));

		expect(result.offerFetchingStatus).toBe(expectedStatus);
	});

	it('should set "offerFetchingStatus" to Pending with "fetchOfferApiAction.rejected" action', () => {
		const expectedStatus = RequestStatus.Error;
		const result = offerReducer(undefined, fetchOfferApiAction.rejected);
		expect(result.offerFetchingStatus).toBe(expectedStatus);
	});

	it('should set "neighborPlaces" with "fetchNeighborsApiAction.fulfilled" action', () => {
		const expectedStatus = [createMockOffer(), createMockOffer()];
		const data = expectedStatus;

		const result = offerReducer(undefined, fetchNeighborsApiAction.fulfilled(data, '', {offerId: 'test-offer-id'}));

		expect(result.neighborPlaces).toBe(expectedStatus);
	});

	it('should set "reviewsFetchingStatus" with "fetchReviewsApiAction.pending" action', () => {
		const expectedStatus = RequestStatus.Pending;
		const result = offerReducer(undefined, fetchReviewsApiAction.pending);
		expect(result.reviewsFetchingStatus).toBe(expectedStatus);
	});

	it('should set "reviewsFetchingStatus" with "fetchReviewsApiAction.fulfilled" action', () => {
		const expectedStatus = RequestStatus.Success;
		const data = [createMockReview(), createMockReview()];
		const payload = {offerId: 'test-offer-id'}

		const result = offerReducer(undefined, fetchReviewsApiAction.fulfilled(data, '', payload));

		expect(result.reviewsFetchingStatus).toBe(expectedStatus);
	});

	it('should set "reviewsFetchingStatus" with "fetchReviewsApiAction.rejected" action', () => {
		const expectedStatus = RequestStatus.Error;
		const result = offerReducer(undefined, fetchReviewsApiAction.rejected);
		expect(result.reviewsFetchingStatus).toBe(expectedStatus);
	});

	it('should set "reviewSendingStatus" with "sendReviewApiAction.pending" action', () => {
		const expectedStatus = RequestStatus.Pending;
		const result = offerReducer(undefined, sendReviewApiAction.pending);
		expect(result.reviewSendingStatus).toBe(expectedStatus);
	});

	it('should add review and set "reviewSendingStatus" to success with "sendReviewApiAction.fulfilled" action', () => {
		const initialReviews = [createMockReview(), createMockReview()];
		const extraReview = createMockReview();
		const expectedReviews = [...initialReviews, extraReview];
		const initialState = {
			offer: createFullMockOffer(),
			offerFetchingStatus: RequestStatus.Idle,
			neighborPlaces: [createMockOffer()],
			reviews: initialReviews,
			reviewsFetchingStatus:  RequestStatus.Idle,
			reviewSendingStatus:  RequestStatus.Idle,
		};
		const expectedState = {
			...initialState,
			reviews: expectedReviews,
			reviewSendingStatus: RequestStatus.Success,
		};
		const payload = {
			offerId: initialState.offer.id,
			comment: 'test-comment',
			rating: 3,
		};

		const result = offerReducer(initialState, sendReviewApiAction.fulfilled(extraReview, '', payload));

		expect(result).toEqual(expectedState);
	});

	it('should set "reviewSendingStatus" to Error with "sendReviewApiAction.rejected" action', () => {
		const expectedStatus = RequestStatus.Error;
		const result = offerReducer(undefined, sendReviewApiAction.rejected);
		expect(result.reviewSendingStatus).toBe(expectedStatus);
	});

});
