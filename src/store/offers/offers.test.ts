import { describe } from 'vitest';
import { DEFAULT_CITY, FavoritesStatus, RequestStatus, SortMethod } from '../../constants/common';
import { createMockOffer } from '../../utils/mocks';
import { offersActions, offersReducer } from './offers.slice';
import { fetchOffersApiAction } from '../api-actions';

describe ('Offers slice (reducer)', () => {

	const emptyAction = {type: ''};

	it('Should return initial state with empty action', () => {
		const expectedState = {
			city: 'Budapest',
			sort: SortMethod.PriceToHigh as string,
			activeOffer: 'test-id-active-offer',
			allOffers: [createMockOffer(), createMockOffer()],
			allOffersFetchingStatus: RequestStatus.Success,
		};

		const result = offersReducer(expectedState, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should return default initial state with empty action and undefined state', () => {
		const expectedState = {
			city: DEFAULT_CITY,
			sort: SortMethod.Popular as string,
			activeOffer: null,
			allOffers: [],
			allOffersFetchingStatus: RequestStatus.Idle,
		};

		const result = offersReducer(undefined, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should set ActiveOffer with "setActiveOffer" action', () => {
		const initialState = {
			city: 'Budapest',
			sort: SortMethod.PriceToHigh as string,
			activeOffer: null,
			allOffers: [createMockOffer(), createMockOffer()],
			allOffersFetchingStatus: RequestStatus.Success,
		};
		const expectedActiveOffer = 'test-active-offer-id';

		const result = offersReducer(initialState, offersActions.setActiveOffer(expectedActiveOffer));

		expect(result.activeOffer).toBe(expectedActiveOffer);
	});

	it('Should set city with "setCity" action', () => {
		const initialState = {
			city: 'Budapest',
			sort: SortMethod.PriceToHigh as string,
			activeOffer: null,
			allOffers: [createMockOffer(), createMockOffer()],
			allOffersFetchingStatus: RequestStatus.Success,
		};
		const expectedCity = 'Prague';

		const result = offersReducer(initialState, offersActions.setCity(expectedCity));

		expect(result.city).toBe(expectedCity);
	});

	it('Should set sort with "setSort" action', () => {
		const initialState = {
			city: 'Budapest',
			sort: SortMethod.PriceToHigh as string,
			activeOffer: null,
			allOffers: [createMockOffer(), createMockOffer()],
			allOffersFetchingStatus: RequestStatus.Success,
		};
		const expectedSort = SortMethod.Popular;

		const result = offersReducer(initialState, offersActions.setSort(expectedSort));

		expect(result.sort).toBe(expectedSort);
	});

	it('Should set favorite with "setIsFavorite" action', () => {
		const initialState = {
			city: 'Budapest',
			sort: SortMethod.PriceToHigh as string,
			activeOffer: null,
			allOffers: [createMockOffer(), createMockOffer()],
			allOffersFetchingStatus: RequestStatus.Success,
		};
		const favoriteOfferId = initialState.allOffers[0].id;
		const expectedIsFavoriteStatus =
			initialState.allOffers[0].isFavorite ? FavoritesStatus.Removed : FavoritesStatus.Added;

		const result = offersReducer(
			initialState,
			offersActions.setIsFavorite({offerId:favoriteOfferId, status: expectedIsFavoriteStatus})
		);

		expect(result.allOffers[0].isFavorite).toBe(Boolean(expectedIsFavoriteStatus));
	});

	it('should set "allOffersFetchingStatus" with "fetchOffersApiAction.pending" action', () => {
		const expectedStatus = RequestStatus.Pending;
		const result = offersReducer(undefined, fetchOffersApiAction.pending);
		expect(result.allOffersFetchingStatus).toBe(expectedStatus);
	});

	it('should set "offers" and "allOffersFetchingStatus" with "fetchOffersApiAction.fulfilled" action', () => {
		const expectedStatus = RequestStatus.Success;
		const offers = [createMockOffer(), createMockOffer()];

		const result = offersReducer(undefined, fetchOffersApiAction.fulfilled(offers, '', undefined));

		expect(result.allOffersFetchingStatus).toBe(expectedStatus);
	});

	it('should set "allOffersFetchingStatus" to rejected with "fetchOffersApiAction.rejected" action', () => {
		const expectedStatus = RequestStatus.Error;
		const result = offersReducer(undefined, fetchOffersApiAction.rejected);
		expect(result.allOffersFetchingStatus).toBe(expectedStatus);
	});
});
