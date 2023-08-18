import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { ServerOffer } from '../../types/offer';
import { RequestStatus } from '../../constants/common';
import { fetchFavoritesApiAction } from '../api-actions';
import { Reducer } from 'react';

type FavoritesState = {
	favorites: ServerOffer[];
	favoritesFetchingStatus: RequestStatus;
	favoriteAmount: number;
}

const initialState: FavoritesState = {
	favorites: [],
	favoritesFetchingStatus: RequestStatus.Idle,
	favoriteAmount: 0,
};

const slice = createSlice({
	name: NameSpace.Favorites,
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(fetchFavoritesApiAction.pending, (state) => {
				state.favoritesFetchingStatus = RequestStatus.Pending;
			})
			.addCase(fetchFavoritesApiAction.fulfilled, (state, action: PayloadAction<ServerOffer[]>) => {
				state.favoritesFetchingStatus = RequestStatus.Success;
				state.favorites = action.payload;
			})
			.addCase(fetchFavoritesApiAction.rejected, (state) => {
				state.favoritesFetchingStatus = RequestStatus.Error;
			})
	}
);

export const {
	actions: favoritesActions,
	reducer: favoritesReducer,
} = slice;
