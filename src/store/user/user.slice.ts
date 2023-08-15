import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../constants';

type UserState = {
	AuthorizationStatus: AuthorizationStatus;
	UserName: string | null;
}

const initialState: UserState = {
	AuthorizationStatus: AuthorizationStatus.Unknown,
	UserName: null,
};

const slice = createSlice({
	name: NameSpace.User,
	initialState,
	reducers: {
		// requireAuthorization (state, action: PayloadAction<AuthorizationStatus>) {
		requireAuthorization (state, action: PayloadAction<UserState>) {
			state.AuthorizationStatus = action.payload.AuthorizationStatus;
			// if (action.payload === AuthorizationStatus.Auth) {
			state.UserName = action.payload.UserName;
			// }
		},
	}
});

export const {
	reducer: userReducer,
	actions: userActions,
} = slice;
