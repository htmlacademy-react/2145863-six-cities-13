import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';

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
		setActiveOffer(state, action: PayloadAction<string>) {
			state.activeOffer = action.payload;
		},
	}
});

export const {
	reducer: interactionsReducer,
	actions: interactionsActions,
} = slice;
