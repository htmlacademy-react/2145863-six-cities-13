import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { ServerOffer } from '../../types/offer';
import { FavoritesStatus, RequestStatus } from '../../constants/common';
import { fetchFavoritesApiAction, sendFavoriteStatusApiAction } from '../api-actions';

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
				state.favoriteAmount = action.payload.length;
			})
			.addCase(fetchFavoritesApiAction.rejected, (state) => {
				state.favoritesFetchingStatus = RequestStatus.Error;
			})
			.addCase(sendFavoriteStatusApiAction.fulfilled, (state,
				action: PayloadAction<{offer: ServerOffer; status: FavoritesStatus}>) => {
				switch(action.payload.status) {
					case FavoritesStatus.Added:
						state.favorites.push(action.payload.offer);
						state.favoriteAmount++;
						break;
					case FavoritesStatus.Removed:
						state.favorites = state.favorites.filter((offer) => offer.id !== action.payload.offer.id);
						state.favoriteAmount--;
						break;
				}
			})
}
);

export const {
	actions: favoritesActions,
	reducer: favoritesReducer,
} = slice;
