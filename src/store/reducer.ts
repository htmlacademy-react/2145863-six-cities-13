import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY, SortMethod } from '../constants';
import { getOfferList } from '../model';
import { fillOfferList, setActiveCard, setCity, setSort } from './action';
import { convertOffersToOffersByCity, sortMap } from '../utils/convert';
import { State } from '../types/state';

const offers = getOfferList();
const offerList = convertOffersToOffersByCity(offers)[DEFAULT_CITY];
const favoriteAmount = offers.filter((offer) => offer.isFavorite).length;

const initialState = {
	city: DEFAULT_CITY,
	activeCard: '',
	offerList,
	favoriteAmount,
	sort: SortMethod.TopRatedFirst as string,
	// sort: SortMethod.Popular as string,
};

const prepareOfferList = (state: State) => {
	const {city, sort} = state;
	return convertOffersToOffersByCity(offers)[city].sort(sortMap[sort].sortFunc);
}

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setCity, (state, action) => {
			state.city = action.payload;
			state.offerList = prepareOfferList(state);
		})
		.addCase(setSort, (state, action) => {
			state.sort = action.payload;
			state.offerList = prepareOfferList(state);
		})
		.addCase(setActiveCard, (state, action) => {
			state.activeCard = action.payload;
		})
		.addCase(fillOfferList, (state) => {
			state.offerList = prepareOfferList(state);
		});
});

export {reducer};
