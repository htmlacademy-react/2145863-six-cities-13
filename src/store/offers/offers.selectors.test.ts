import { describe } from 'vitest';
import { CITIES, NameSpace, SortMethod } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { createMockOffer } from '../../utils/mocks';
import { getActiveOffer, getAllOffers, getAllOffersFetchingStatus, getCity, getSort } from './offers.selectors';

describe('Offers selectors', () => {
	const cities = Array.from(CITIES);
	const offers = [createMockOffer(), createMockOffer()];

	const state = {
		[NameSpace.Offers]: {
			city: cities[0],
			sort: SortMethod.Popular as string,
			activeOffer: offers[0].id,
			allOffers: offers,
			allOffersFetchingStatus: RequestStatus.Idle,
		}
	};

	it('should return city from state', () => {
		const {city} = state[NameSpace.Offers];
		const result = getCity(state);
		expect(result).toBe(city);
	});
	it('should return city from state', () => {
		const {sort} = state[NameSpace.Offers];
		const result = getSort(state);
		expect(result).toBe(sort);
	});

	it('should return city from state', () => {
		const {activeOffer} = state[NameSpace.Offers];
		const result = getActiveOffer(state);
		expect(result).toBe(activeOffer);
	});

	it('should return city from state', () => {
		const {allOffers} = state[NameSpace.Offers];
		const result = getAllOffers(state);
		expect(result).toEqual(allOffers);
	});

	it('should return city from state', () => {
		const {allOffersFetchingStatus} = state[NameSpace.Offers];
		const result = getAllOffersFetchingStatus(state);
		expect(result).toBe(allOffersFetchingStatus);
	});
});
