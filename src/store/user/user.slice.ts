import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { User } from '../../types/user';

type UserState = {
	authorizationStatus: AuthorizationStatus;
	loginSendingStatus: RequestStatus;
	user: User | null;
}

const initialState: UserState = {
	authorizationStatus: AuthorizationStatus.Unknown,
	loginSendingStatus: RequestStatus.Idle,
	user: null,
};

const slice = createSlice({
	name: NameSpace.User,
	initialState,
	reducers: {
		dropLoginSendingStatus (state) {
			state.loginSendingStatus = RequestStatus.Idle;
		}
	},
	extraReducers: (builder) => {
		builder
			// check-auth
			.addCase(checkAuthAction.pending, (store) => {
				store.user = null;
				store.authorizationStatus = AuthorizationStatus.Unknown;
			})
			.addCase(checkAuthAction.fulfilled, (store, action: PayloadAction<User>) => {
				store.user = action.payload;
				store.authorizationStatus = AuthorizationStatus.Auth;
			})
			.addCase(checkAuthAction.rejected, (store) => {
				store.user = null;
				store.authorizationStatus = AuthorizationStatus.NoAuth;
			})
			// login-action
			.addCase(loginAction.pending, (store) => {
				store.loginSendingStatus = RequestStatus.Pending;
			})
			.addCase(loginAction.fulfilled, (store, action: PayloadAction<User>) => {
				store.loginSendingStatus = RequestStatus.Success;
				store.user = action.payload;
				store.authorizationStatus = AuthorizationStatus.Auth;
			})
			.addCase(loginAction.rejected, (store) => {
				store.loginSendingStatus = RequestStatus.Error;
				store.user = null;
				store.authorizationStatus = AuthorizationStatus.NoAuth;
			})
			.addCase(logoutAction.fulfilled, (store) => {
				store.authorizationStatus = AuthorizationStatus.NoAuth;
				store.user = null;
			});

	},
});

export const {
	reducer: userReducer,
	actions: userActions,
} = slice;
