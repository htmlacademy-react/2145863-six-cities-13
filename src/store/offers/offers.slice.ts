import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SortMap, convertOffersToOffersByCity } from '../../utils/convert';
import { DEFAULT_CITY, NameSpace, SortMethod } from '../../constants';
import { ServerFullOffer, ServerOffer } from '../../types/offer';
import { FavoritesStatus, RequestStatus } from '../../constants/common';
import { fetchOffersApiAction } from '../api-actions';

type OffersState = {
	city: string;
	sort: string;
	activeOffer: string | null;
	allOffers: ServerOffer[];
	allOffersFetchingStatus: RequestStatus;
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
		setIsFavorite(state, action: PayloadAction<{offerId: ServerFullOffer['id']; status: FavoritesStatus}>) {
			const offer = state.allOffers.find((allOffer) => allOffer.id === action.payload.offerId);
			const offerInList = state.offerList.find((listOffer) => listOffer.id === action.payload.offerId);
			if (offer && offerInList) {
				offer.isFavorite = Boolean(action.payload.status);
				offerInList.isFavorite = Boolean(action.payload.status);
			}
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
			});

	}
});

export const {
	reducer: offersReducer,
	actions: offersActions,
} = slice;
