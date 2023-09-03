import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { ServerFullOffer, ServerOffer, ServerReview } from '../../types/offer';
import { RequestStatus } from '../../constants/common';
import { fetchNeighborsApiAction, fetchOfferApiAction, fetchReviewsApiAction, sendReviewApiAction } from '../api-actions';

export type OfferState = {
	offer: ServerFullOffer | null;
	offerFetchingStatus: RequestStatus;
	neighborPlaces: ServerOffer[];
	reviews: ServerReview[];
	reviewsFetchingStatus: RequestStatus;
	reviewSendingStatus: RequestStatus;
}

const initialState: OfferState = {
	offer: null,
	offerFetchingStatus: RequestStatus.Idle,
	neighborPlaces: [],
	reviews: [],
	reviewsFetchingStatus:  RequestStatus.Idle,
	reviewSendingStatus:  RequestStatus.Idle,
};

const slice = createSlice({
	name: NameSpace.Offer,
	initialState,
	reducers: {
		dropReviewSendingStatus(state) {
			state.reviewSendingStatus = RequestStatus.Idle;
		},
		dropOffer(state) {
			state.offer = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOfferApiAction.pending, (state) => {
				state.offerFetchingStatus = RequestStatus.Pending;
			})
			.addCase(fetchOfferApiAction.fulfilled, (state, action: PayloadAction<ServerFullOffer>) => {
				state.offerFetchingStatus = RequestStatus.Success;
				state.offer = action.payload;
			})
			.addCase(fetchOfferApiAction.rejected, (state) => {
				state.offerFetchingStatus = RequestStatus.Error;
			})
			.addCase(fetchNeighborsApiAction.fulfilled, (state, action: PayloadAction<ServerOffer[]>) => {
				state.neighborPlaces = action.payload;
			})
			.addCase(fetchReviewsApiAction.pending, (state) => {
				state.reviewsFetchingStatus = RequestStatus.Pending;
			})
			.addCase(fetchReviewsApiAction.fulfilled, (state, action: PayloadAction<ServerReview[]>) => {
				state.reviewsFetchingStatus = RequestStatus.Success;
				state.reviews = action.payload;
			})
			.addCase(fetchReviewsApiAction.rejected, (state) => {
				state.reviewsFetchingStatus = RequestStatus.Error;
			})
			.addCase(sendReviewApiAction.pending, (state) => {
				state.reviewSendingStatus = RequestStatus.Pending;
			})
			.addCase(sendReviewApiAction.fulfilled, (state, action: PayloadAction<ServerReview>) => {
				state.reviewSendingStatus = RequestStatus.Success;
				state.reviews.push(action.payload);
			})
			.addCase(sendReviewApiAction.rejected, (state) => {
				state.reviewSendingStatus = RequestStatus.Error;
			});
	}
});

export const {
	reducer: offerReducer,
	actions: offerActions,
} = slice;
