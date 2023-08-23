import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
}

const initialState: OffersState = {
	city: DEFAULT_CITY,
	sort: SortMethod.Popular as string,
	activeOffer: null,
	allOffers: [],
	allOffersFetchingStatus: RequestStatus.Idle,
};

const slice = createSlice({
	name: NameSpace.Offers,
	initialState,
	reducers: {
		setActiveOffer(state, action: PayloadAction<ServerOffer['id'] | null>) {
			state.activeOffer = action.payload;
		},
		setCity(state, action: PayloadAction<string>) {
			state.city = action.payload;
		},
		setSort(state, action: PayloadAction<string>) {
			state.sort = action.payload;
		},
		setIsFavorite(state, action: PayloadAction<{offerId: ServerFullOffer['id']; status: FavoritesStatus}>) {
			const offer = state.allOffers.find((allOffer) => allOffer.id === action.payload.offerId);
			if (offer) {
				offer.isFavorite = Boolean(action.payload.status);
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
