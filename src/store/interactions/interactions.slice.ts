import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { ServerOffer } from '../../types/offer';

type OffersState = {
	activeOffer: string;
}

const initialState: OffersState = {
	activeOffer: '',
};

const slice = createSlice({
	name: NameSpace.Interactions,
	initialState,
	reducers: {
		setActiveOffer(state, action: PayloadAction<ServerOffer['id']>) {
			state.activeOffer = action.payload;
		},
	}
});

export const {
	reducer: interactionsReducer,
	actions: interactionsActions,
} = slice;
