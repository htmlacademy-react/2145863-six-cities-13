import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';

type DataState = {
	dataLoadingStatus: number;
}

const initialState: DataState = {
	dataLoadingStatus: 0,
};

const slice = createSlice({
	name: NameSpace.Data,
	initialState,
	reducers: {
		setDataLoadingStatus(state, action: PayloadAction<boolean>) {
			state.dataLoadingStatus += action.payload ? 1 : -1;
			console.log('*** state.dataLoadingStatus: ', state.dataLoadingStatus);
		},
	}
});

export const {
	reducer: dataReducer,
	actions: dataActions,
} = slice;
