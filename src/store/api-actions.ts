/**
 * Все asyncActions в данном случае сложены в один файл. Если проект большой, то
 * для удобства можно раскидать действия например по папкам компонентов страниц.
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { AuthorizationStatus, NameSpace } from '../constants';
import { ServerFullOffer, ServerOffer, ServerReview } from '../types/offer';
import { ApiRoute } from '../constants/routes';
import { offersActions } from './offers/offers.slice';
import { userActions } from './user/user.slice';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { dataActions } from './data/data.slice';
import { LoginData, User } from '../types/user';

type Extra = {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}

// переделано
const fetchOffersApiAction = createAsyncThunk<ServerOffer[], undefined, Extra>(
	`${NameSpace.Offers}/fetchOffersApi`,
	async (_args, {dispatch, extra: api}) => {
		// dispatch(dataActions.setDataLoadingStatus(true));
		const {data} = await api.get<ServerOffer[]>(ApiRoute.getOffers);
		// dispatch(dataActions.setDataLoadingStatus(false));
		// dispatch(offersActions.loadOffers(data));

		return data;
	}
);
// const fetchOffersApiAction = createAsyncThunk<void, undefined,
// {
// 	dispatch: AppDispatch;
// 	state: State;
// 	extra: AxiosInstance;
// }>(
// 	`${NameSpace.Offers}/fetchOffersApi`,
// 	async (_args, {dispatch, extra: api}) => {
// 		dispatch(dataActions.setDataLoadingStatus(true));
// 		const {data} = await api.get<ServerOffer[]>(ApiRoute.getOffers);
// 		dispatch(dataActions.setDataLoadingStatus(false));
// 		dispatch(offersActions.loadOffers(data));
// 	}
// );

const fetchOfferApiAction = createAsyncThunk<ServerFullOffer, {offerId: ServerFullOffer['id']}, Extra>(
	`${NameSpace.Offer}/fetchOfferApi`,
	async (args, {dispatch, extra: api}) => {
		// dispatch(dataActions.setDataLoadingStatus(true));
		const {data} = await api.get<ServerFullOffer>(`${ApiRoute.getOffer}/${args.offerId}`);
		// dispatch(dataActions.setDataLoadingStatus(false));
		// dispatch(offersActions.loadOffer(data));

		return data;
	}
);
// const fetchOfferApiAction = createAsyncThunk<void, {offerId: string | null},
// {
// 	dispatch: AppDispatch;
// 	state: State;
// 	extra: AxiosInstance;
// }>(
// 	`${NameSpace.Offers}/fetchOfferApi`,
// 	async (args, {dispatch, extra: api}) => {
// 		dispatch(dataActions.setDataLoadingStatus(true));
// 		const {data} = await api.get<ServerFullOffer>(`${ApiRoute.getOffer}/${args.offerId}`);
// 		dispatch(dataActions.setDataLoadingStatus(false));
// 		dispatch(offersActions.loadOffer(data));
// 	}
// );

const fetchReviewApiAction = createAsyncThunk<ServerReview[], {offerId: ServerFullOffer['id']}, Extra>(
	`${NameSpace.Offer}/fetchReviewsApi`,
	async (args, {dispatch, extra: api}) => {
		// dispatch(dataActions.setDataLoadingStatus(true));
		const {data} = await api.get<ServerReview[]>(`${ApiRoute.getReviews}/${args.offerId}`);
		// dispatch(dataActions.setDataLoadingStatus(false));
		// dispatch(offersActions.loadReview(data));

		return data;
	}
);

// const fetchReviewApiAction = createAsyncThunk<void, {offerId: string | null},
// {
// 	dispatch: AppDispatch;
// 	state: State;
// 	extra: AxiosInstance;
// }>(
// 	`${NameSpace.Offers}/fetchReviewApi`,
// 	async (args, {dispatch, extra: api}) => {
// 		dispatch(dataActions.setDataLoadingStatus(true));
// 		const {data} = await api.get<ServerReview[]>(`${ApiRoute.getReviews}/${args.offerId}`);
// 		dispatch(dataActions.setDataLoadingStatus(false));
// 		dispatch(offersActions.loadReview(data));
// 	}
// );

const fetchNeighborsApiAction = createAsyncThunk<ServerOffer[], {offerId: ServerFullOffer['id']}, Extra>(
	`${NameSpace.Offer}/fetchNeighborApi`,
	async (args, {dispatch, extra: api}) => {
		// if (args.offerId) {
		// dispatch(dataActions.setDataLoadingStatus(true));
		const {data} = await api.get<ServerOffer[]>(ApiRoute.getNearby.replace('{offerId}', args.offerId));
		// dispatch(dataActions.setDataLoadingStatus(false));
		// dispatch(offersActions.loadNeighborPlaces(data));

			return data;
		// }
	}
);

// const fetchNeighborsApiAction = createAsyncThunk<void, {offerId: string | null},
// {
// 	dispatch: AppDispatch;
// 	state: State;
// 	extra: AxiosInstance;
// }>(
// 	`${NameSpace.Offers}/fetchNeighborApi`,
// 	async (args, {dispatch, extra: api}) => {
// 		if (args.offerId) {
// 			dispatch(dataActions.setDataLoadingStatus(true));
// 			const {data} = await api.get<ServerOffer[]>(ApiRoute.getNearby.replace('{offerId}', args.offerId));
// 			dispatch(dataActions.setDataLoadingStatus(false));
// 			dispatch(offersActions.loadNeighborPlaces(data));
// 		}
// 	}
// );

const checkAuthAction = createAsyncThunk<User, undefined, Extra>(
	`${NameSpace.User}/checkAuth`,
	async (_arg, {dispatch, extra: api}) => {
		// try {
			const {data} = await api.get<User>(ApiRoute.Login);

			return data;

			// dispatch(userActions.requireAuthorization({
				// AuthorizationStatus: AuthorizationStatus.Auth,
				// UserName: response.data.email
			// }));
		// } catch {
			// dispatch(userActions.requireAuthorization({
				// AuthorizationStatus: AuthorizationStatus.NoAuth,
				// UserName: null
			// }));
		// }
	},
);

// const checkAuthAction = createAsyncThunk<void, undefined,
// {
// 	dispatch: AppDispatch;
// 	state: State;
// 	extra: AxiosInstance;
// }>(
// 	`${NameSpace.User}/checkAuth`,
// 	async (_arg, {dispatch, extra: api}) => {
// 		try {
// 			const response = await api.get(ApiRoute.Login);
// 			dispatch(userActions.requireAuthorization({
// 				AuthorizationStatus: AuthorizationStatus.Auth,
// 				UserName: response.data.email
// 			}));
// 		} catch {
// 			dispatch(userActions.requireAuthorization({
// 				AuthorizationStatus: AuthorizationStatus.NoAuth,
// 				UserName: null
// 			}));
// 		}
// 	},
// );

const loginAction = createAsyncThunk<User, LoginData, Extra>(
	`${NameSpace.User}/login`,
	async ({login: email, password}, {dispatch, extra: api}) => {

		const {data} = await api.post<User>(ApiRoute.Login, {email, password});
		saveToken(data.token);
		// dispatch(userActions.requireAuthorization({
		// 	AuthorizationStatus: AuthorizationStatus.Auth,
		// 	UserName: email,
		// }));

		return data;
	}
);

// const loginAction = createAsyncThunk<void, AuthData, {
// 	dispatch: AppDispatch;
// 	state: State;
// 	extra: AxiosInstance;
// }>(
// 	`${NameSpace.User}/login`,
// 	async ({login: email, password}, {dispatch, extra: api}) => {
// 		const {data: {token}} = await api.post<UserData>(ApiRoute.Login, {email, password});
// 		saveToken(token);
// 		dispatch(userActions.requireAuthorization({
// 			AuthorizationStatus: AuthorizationStatus.Auth,
// 			UserName: email,
// 		}));
// 	}
// );

const logoutAction = createAsyncThunk<void, undefined, Extra>(
	`${NameSpace.User}/logout`,
	async (_arg, {dispatch, extra: api}) => {
		await api.delete(ApiRoute.Logout);
		dropToken();
		// dispatch(userActions.requireAuthorization({
		// 	AuthorizationStatus: AuthorizationStatus.NoAuth,
		// 	UserName: null,
		// }));
	}
);

// const logoutAction = createAsyncThunk<void, undefined, {
// 	dispatch: AppDispatch;
// 	state: State;
// 	extra: AxiosInstance;
// }>(
// 	`${NameSpace.User}/logout`,
// 	async (_arg, {dispatch, extra: api}) => {
// 		await api.delete(ApiRoute.Logout);
// 		dropToken();
// 		dispatch(userActions.requireAuthorization({
// 			AuthorizationStatus: AuthorizationStatus.NoAuth,
// 			UserName: null,
// 		}));
// 	}
// );

const sendReviewApiAction = createAsyncThunk<ServerReview, {
		offerId: ServerFullOffer['id'];
		comment: string;
		rating: number
	}, Extra>(
	`${NameSpace.Offers}/sendReviewApi`,
	async (args, {dispatch, extra: api}) => {
	// dispatch(dataActions.setDataLoadingStatus(true));
	// const {data} = await api.get<ServerOffer[]>(ApiRoute.getNearby.replace('{offerId}', args.offerId));
		const {data} = await api.post<ServerReview>(
			`${ApiRoute.postReview}/${args.offerId}`, {
				comment: args.comment,
				rating: args.rating,
			});
		// dispatch(offersActions.addComment(data));

		return data;
	}
);

// const sendReviewApiAction = createAsyncThunk<void, {offerId: string; comment: string;	rating: number},
// {
// 	dispatch: AppDispatch;
// 	state: State;
// 	extra: AxiosInstance;
// }>(
// 	`${NameSpace.Offers}/sendCommentApi`,
// 	async (args, {dispatch, extra: api}) => {
// 	// dispatch(dataActions.setDataLoadingStatus(true));
// 	// const {data} = await api.get<ServerOffer[]>(ApiRoute.getNearby.replace('{offerId}', args.offerId));
// 		console.log('args', args);
// 		const {data} = await api.post<ServerReview>(
// 			`${ApiRoute.postReview}/${args.offerId}`, {
// 				comment: args.comment,
// 				rating: args.rating,
// 			});
// 		// dispatch(dataActions.setDataLoadingStatus(false));
// 		dispatch(offersActions.addComment(data));
// 	}
// );

export {
	fetchOffersApiAction,
	fetchOfferApiAction,
	fetchReviewApiAction,
	fetchNeighborsApiAction,
	checkAuthAction,
	loginAction,
	logoutAction,
	sendReviewApiAction,
};
