import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SortMap, convertOffersToOffersByCity } from '../../utils/convert';
import { DEFAULT_CITY, NameSpace, SortMethod } from '../../constants';
import { ServerOffer } from '../../types/offer';
import { RequestStatus } from '../../constants/common';
import { fetchOffersApiAction } from '../api-actions';

type OffersState = {
	city: string;																// есть (но с типом ServerOffer['City'])
	sort: string;
	activeOffer: string | null;
	allOffers: ServerOffer[];										// есть
	allOffersFetchingStatus: RequestStatus;			// есть
	// в ретро нет offerList
	offerList: ServerOffer[];
}

const initialState: OffersState = {
	city: DEFAULT_CITY,
	sort: SortMethod.Popular as string,
	activeOffer: null,
	allOffers: [],
	allOffersFetchingStatus: RequestStatus.Idle,
	offerList: [],
};

const prepareOfferList = (state: OffersState) => {
	const {city, sort} = state;
	return convertOffersToOffersByCity(state.allOffers)[city]?.sort(SortMap[sort].sortFunc) || [];
};

const slice = createSlice({
	name: NameSpace.Offers,
	initialState,
	reducers: {
		setActiveOffer(state, action: PayloadAction<ServerOffer['id'] | null>) {
			state.activeOffer = action.payload;
		},
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
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOffersApiAction.pending, (state) => {
				state.allOffersFetchingStatus = RequestStatus.Pending;
			})
			.addCase(fetchOffersApiAction.fulfilled, (state, action: PayloadAction<ServerOffer[]>) => {
				state.allOffersFetchingStatus = RequestStatus.Success;
				state.allOffers = action.payload;
			})
			.addCase(fetchOffersApiAction.rejected, (state) => {
				state.allOffersFetchingStatus = RequestStatus.Error;
			})

	}
});

export const {
	reducer: offersReducer,
	actions: offersActions,
} = slice;
