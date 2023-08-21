/**
 * Все asyncActions в данном случае сложены в один файл. Если проект большой, то
 * для удобства можно раскидать действия например по папкам компонентов страниц.
 */
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { NameSpace } from '../constants';
import { ServerFullOffer, ServerOffer, ServerReview } from '../types/offer';
import { ApiRoute } from '../constants/routes';
import { dropToken, saveToken } from '../services/token';
import { LoginData, User } from '../types/user';

type Extra = {
	dispatch?: AppDispatch;
	state?: State;
	extra: AxiosInstance;
}

const fetchOffersApiAction = createAsyncThunk<ServerOffer[], undefined, Extra>(
	`${NameSpace.Offers}/fetchOffersApi`,
	async (_args, {extra: api}) => {
		const {data} = await api.get<ServerOffer[]>(ApiRoute.getOffers);

		const cities = [...(new Set(data.map((offer) => offer.city.name)))];
		console.log(cities);

		return data;
	}
);

const fetchOfferApiAction = createAsyncThunk<ServerFullOffer, {offerId: ServerFullOffer['id']}, Extra>(
	`${NameSpace.Offer}/fetchOfferApi`,
	async (args, {extra: api}) => {
		const {data} = await api.get<ServerFullOffer>(`${ApiRoute.getOffer}/${args.offerId}`);

		return data;
	}
);

const fetchReviewsApiAction = createAsyncThunk<ServerReview[], {offerId: ServerFullOffer['id']}, Extra>(
	`${NameSpace.Offer}/fetchReviewsApi`,
	async (args, {extra: api}) => {
		const {data} = await api.get<ServerReview[]>(`${ApiRoute.getReviews}/${args.offerId}`);

		return data;
	}
);

const fetchNeighborsApiAction = createAsyncThunk<ServerOffer[], {offerId: ServerFullOffer['id']}, Extra>(
	`${NameSpace.Offer}/fetchNeighborApi`,
	async (args, {extra: api}) => {
		const {data} = await api.get<ServerOffer[]>(ApiRoute.getNearby.replace('{offerId}', args.offerId));

		return data;
	}
);

const fetchFavoritesApiAction = createAsyncThunk<ServerOffer[], undefined, Extra>(
	`${NameSpace.Favorites}/fetchFavoritesApi`,
	async (_args, {extra: api}) => {
		const {data} = await api.get<ServerOffer[]>(ApiRoute.getFavorites);

		return data;
	}
) as AsyncThunk<ServerOffer[], undefined, Extra>;


const checkAuthAction = createAsyncThunk<User, undefined, Extra>(
	`${NameSpace.User}/checkAuth`,
	async (_args, {dispatch, extra: api}) => {
		const {data} = await api.get<User>(ApiRoute.Login);
		dispatch(fetchFavoritesApiAction());

		return data;
	}
);


const loginAction = createAsyncThunk<User, LoginData, Extra>(
	`${NameSpace.User}/login`,
	async ({email, password}, {dispatch, extra: api}) => {

		const {data} = await api.post<User>(ApiRoute.Login, {email, password});
		saveToken(data.token);
		dispatch(fetchFavoritesApiAction());

		return data;
	}
);

const logoutAction = createAsyncThunk<void, undefined, Extra>(
	`${NameSpace.User}/logout`,
	async (_args, {extra: api}) => {
		await api.delete(ApiRoute.Logout);
		dropToken();
	}
);

const sendReviewApiAction = createAsyncThunk<ServerReview, {
		offerId: ServerFullOffer['id'];
		comment: string;
		rating: number;
	}, Extra>(
		`${NameSpace.Offers}/sendReviewApi`,
		async (args, {extra: api}) => {
			const {data} = await api.post<ServerReview>(
				`${ApiRoute.postReview}/${args.offerId}`, {
					comment: args.comment,
					rating: args.rating,
				});

			return data;
		}
	);

export {
	fetchOffersApiAction,
	fetchOfferApiAction,
	fetchReviewsApiAction,
	fetchNeighborsApiAction,
	fetchFavoritesApiAction,
	checkAuthAction,
	loginAction,
	logoutAction,
	sendReviewApiAction,
};
