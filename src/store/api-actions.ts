/**
 * Все asyncActions в данном случае сложены в один файл. Если проект большой, то
 * для удобства можно раскидать действия например по папкам компонентов страниц.
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { AuthorizationStatus, NameSpace } from '../constants';
import { ServerOffer } from '../types/offer';
import { ApiRoute } from '../constants/routes';
import { offersActions } from './offers/offers.slice';
import { userActions } from './user/user.slice';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { errorActions } from './errors/errors.slice';
import { store } from '.';
import { TIMEOUT_SHOW_ERROR } from '../constants/common';

const clearErrorAction = createAsyncThunk(
	`${NameSpace.Error}/clearError`,
	() => {
		setTimeout(
			() => store.dispatch(errorActions.setError(null)),
			TIMEOUT_SHOW_ERROR
		);
	},
);

const fetchOffersAction = createAsyncThunk<void, undefined,
{
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance
}>(
	`${NameSpace.Offers}/fetchOffersApi`,
	async (_args, {dispatch, extra: api}) => {
		const {data} = await api.get<ServerOffer[]>(ApiRoute.getOffers);
		dispatch(offersActions.fetchOffers(data));
	}
);

const checkAuthAction = createAsyncThunk<void, undefined,
{
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	`${NameSpace.User}/checkAuth`,
	async (_arg, {dispatch, extra: api}) => {
		try {
			await api.get(ApiRoute.Login);
			dispatch(userActions.requireAuthorization(AuthorizationStatus.Auth));
		} catch {
			dispatch(userActions.requireAuthorization(AuthorizationStatus.NoAuth));
		}
	},
);

const loginAction = createAsyncThunk<void, AuthData, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	`${NameSpace.User}/login`,
	async ({login: email, password}, {dispatch, extra: api}) => {
		const {data: {token}} = await api.post<UserData>(ApiRoute.Login, {email, password});
		saveToken(token);
		dispatch(userActions.requireAuthorization(AuthorizationStatus.Auth));
	}
);

const logoutAction = createAsyncThunk<void, undefined, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	`${NameSpace.User}/logout`,
	async (_arg, {dispatch, extra: api}) => {
		await api.delete(ApiRoute.Logout);
		dropToken();
		dispatch(userActions.requireAuthorization(AuthorizationStatus.NoAuth));
	}
);

//TODO: при загрузке офера логично воспользоваться promise.all

export {
	clearErrorAction,
	fetchOffersAction,
	checkAuthAction,
	loginAction,
	logoutAction
};
