import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';

type ErrorState = {
	error: string | null;
}

const initialState: ErrorState = {
	error: null,
};

const slice = createSlice({
	name: NameSpace.Error,
	initialState,
	reducers: {
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload;
		},
	}
});

export const {
	reducer: errorReducer,
	actions: errorActions,
} = slice;
