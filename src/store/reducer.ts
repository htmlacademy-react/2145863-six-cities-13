import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../constants';
import { getOfferList } from '../model';
import { fillOfferList, setActiveCard, setCity } from './action';
import { converOffersToOffersByCity } from '../utils/convert';

const offers = getOfferList();
const offerList = converOffersToOffersByCity(offers)[DEFAULT_CITY];
const favoriteAmount = offers.filter((offer) => offer.isFavorite).length;

const initialState = {
	city: DEFAULT_CITY,
	activeCard: '',
	offerList,
	favoriteAmount,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setCity, (state, action) => {
			state.city = action.payload;
		})
		.addCase(setActiveCard, (state, action) => {
			state.activeCard = action.payload;
		})
		.addCase(fillOfferList, (state) => {
			state.offerList = converOffersToOffersByCity(offers)[state.city];
		});
});

export {reducer};
