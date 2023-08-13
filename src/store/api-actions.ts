/**
 * Все asyncActions в данном случае сложены в один файл. Если проект большой, то
 * для удобства можно раскидать действия например по папкам компонентов страниц.
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { AuthorizationStatus, NameSpace } from '../constants';
import { ServerFullOffer, ServerOffer } from '../types/offer';
import { ApiRoute } from '../constants/routes';
import { offersActions } from './offers/offers.slice';
import { userActions } from './user/user.slice';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { dataActions } from './data/data.slice';

const fetchOffersActionApi = createAsyncThunk<void, undefined,
{
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	`${NameSpace.Offers}/fetchOffersApi`,
	async (_args, {dispatch, extra: api}) => {
		dispatch(dataActions.setDataLoadingStatus(true));
		const {data} = await api.get<ServerOffer[]>(ApiRoute.getOffers);
		dispatch(dataActions.setDataLoadingStatus(false));
		dispatch(offersActions.fetchOffers(data));
	}
);

const fetchOfferActionApi = createAsyncThunk<void, {offerId: string | null},
{
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	`${NameSpace.Offers}/fetchOfferApi`,
	async (args, {dispatch, extra: api}) => {
		console.log(args.offerId);
		dispatch(dataActions.setDataLoadingStatus(true));
		const {data} = await api.get<ServerFullOffer>(`${ApiRoute.getOffer}/${args.offerId}`);
		dispatch(dataActions.setDataLoadingStatus(false));
		dispatch(offersActions.loadOffer(data));
	}
);

// const fetchNeighActionApi = createAsyncThunk<void, {offerId: string | null},
// {
// 	dispatch: AppDispatch;
// 	state: State;
// 	extra: AxiosInstance;
// }>(
// 	`${NameSpace.Offers}/fetchOfferApi`,
// 	async (args, {dispatch, extra: api}) => {
// 		console.log(args.offerId);
// 		dispatch(dataActions.setDataLoadingStatus(true));
// 		const {data} = await api.get<ServerFullOffer>(`${ApiRoute.getOffer}/${args.offerId}`);
// 		dispatch(dataActions.setDataLoadingStatus(false));
// 		dispatch(offersActions.loadOffer(data));
// 	}
// );

const checkAuthAction = createAsyncThunk<void, undefined,
{
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	`${NameSpace.User}/checkAuth`,
	async (_arg, {dispatch, extra: api}) => {
		try {
			const response = await api.get(ApiRoute.Login);
			dispatch(userActions.requireAuthorization({
				AuthorizationStatus: AuthorizationStatus.Auth,
				UserName: response.data.email
			}));
		} catch {
			dispatch(userActions.requireAuthorization({
				AuthorizationStatus: AuthorizationStatus.NoAuth,
				UserName: null
			}));
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
		dispatch(userActions.requireAuthorization({
			AuthorizationStatus: AuthorizationStatus.Auth,
			UserName: email,
		}));
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
		dispatch(userActions.requireAuthorization({
			AuthorizationStatus: AuthorizationStatus.NoAuth,
			UserName: null,
		}));
	}
);

//TODO: при загрузке офера логично воспользоваться promise.all

export {
	fetchOffersActionApi,
	checkAuthAction,
	loginAction,
	logoutAction,
	fetchOfferActionApi,
};
