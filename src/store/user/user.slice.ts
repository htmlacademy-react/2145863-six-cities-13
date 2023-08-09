import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../constants';

type UserState = {
	AuthorizationStatus: AuthorizationStatus;
}

const initialState: UserState = {
	AuthorizationStatus: AuthorizationStatus.Unknown,
};

const slice = createSlice({
	name: NameSpace.User,
	initialState,
	reducers: {
		requireAuthorization (state, action: PayloadAction<AuthorizationStatus>) {
			state.AuthorizationStatus = action.payload;
		},
	}
});

export const {
	reducer: userReducer,
	actions: userActions,
} = slice;
