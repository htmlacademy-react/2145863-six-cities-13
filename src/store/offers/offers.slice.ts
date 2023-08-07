import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getOfferList } from '../../model';
import { SortMap, convertOffersToOffersByCity } from '../../utils/convert';
import { DEFAULT_CITY, NameSpace, SortMethod } from '../../constants';
import { ServerOffer } from '../../types/offer';

const dataOffers = getOfferList();
const favoriteAmount = dataOffers.filter((offer) => offer.isFavorite).length;

type OffersState = {
	city: string;
	sort: string;
	offerList: ServerOffer[];
	favoriteAmount: number;
}

const initialState: OffersState = {
	city: DEFAULT_CITY,
	sort: SortMethod.Popular as string,
	offerList: convertOffersToOffersByCity(dataOffers)[DEFAULT_CITY],
	favoriteAmount,
};

const prepareOfferList = (state: OffersState) => {
	const {city, sort} = state;
	return convertOffersToOffersByCity(dataOffers)[city].sort(SortMap[sort].sortFunc);
};

const slice = createSlice({
	name: NameSpace.Offers,
	initialState,
	reducers: {
		fillOfferList(state) {
			state.offerList = prepareOfferList(state);
		},
		setCity(state, action: PayloadAction<string>) {
			state.city = action.payload;
			state.offerList = prepareOfferList(state);
		},
		setSort(state, action: PayloadAction<string>) {
			state.sort = action.payload;
			state.offerList = prepareOfferList(state);
		},
	}
});

export const {
	reducer: offersReducer,
	actions: offersActions,
} = slice;
