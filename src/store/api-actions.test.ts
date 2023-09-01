/**
 * Модуль тестирования асинхронных действий
 * Использует библиотечные моки (чтобы не писать велосипеды):
 * axios: axios-mock-adapter - обертка над axios перехватывающая запросы к серверу и подменяющая ответы
 * redux store: @jedmao/redux-mock-store - готовый mock store с реализованной типизацией для TS
 *   можно было бы не мокать store, а использовать реальный, но в этом случае
 *   он бы содержал в себе api (axios) и делал бы реальные запросы на сервер.
 */

import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { State } from '../types/state';

import { AppThunkDispatch, createFullMockOffer, createMockOffer, createMockReview, extractActionsTypes } from '../utils/mocks';
import { checkAuthAction, fetchFavoritesApiAction, fetchNeighborsApiAction, fetchOfferApiAction, fetchOffersApiAction, fetchReviewsApiAction, loginAction, logoutAction, sendFavoriteStatusApiAction, sendReviewApiAction } from './api-actions';
import { ApiRoute } from '../constants/routes';
import * as tokenStorage from '../services/token';
import { FavoritesStatus } from '../constants';
import { favoritesActions } from './favorites/favorites.slice';

describe('Async actions', () => {
	const axios = createAPI();
	const mockAxiosAdapter = new MockAdapter(axios);
	const middleware = [thunk.withExtraArgument(axios)];
	const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
	let store: ReturnType<typeof mockStoreCreator>;

	beforeEach(() => {
		store = mockStoreCreator({});
	});

	describe('checkAuthAction', () => {
		it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction"', async () => {
			mockAxiosAdapter.onGet(ApiRoute.Login).reply(200);

			await store.dispatch(checkAuthAction());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				checkAuthAction.pending.type,
				fetchFavoritesApiAction.pending.type,
				checkAuthAction.fulfilled.type,
			]);
		});

		it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" with thunk "checkAuthAction"', async () => {
			mockAxiosAdapter.onGet(ApiRoute.Login).reply(400);

			await store.dispatch(checkAuthAction());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				checkAuthAction.pending.type,
				checkAuthAction.rejected.type,
			]);
		});
	});

	describe('fetchOffersApiAction', () => {

		it('should dispatch "fetchOffersApiAction.pending" and "fetchOffersApiAction.fulfilled" when server response 200', async () => {
			const offers = [createMockOffer(), createMockOffer()];
			mockAxiosAdapter.onGet(ApiRoute.getOffers).reply(200, offers);

			await store.dispatch(fetchOffersApiAction());
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			/** at(0) - pending, at(1) - fulfilled, as приведение к динамически выведенному типу */
			const fetchOffersApiActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersApiAction.fulfilled>;


			expect(extractedActionsTypes).toEqual([
				fetchOffersApiAction.pending.type,
				fetchOffersApiAction.fulfilled.type,
			]);
			expect(fetchOffersApiActionFulfilled.payload).toEqual(offers);
		});

		it('should dispatch "fetchOffersApiAction.pending" and "fetchOffersApiAction.rejected" when server response 400', async () => {
			mockAxiosAdapter.onGet(ApiRoute.getOffers).reply(400, []);

			await store.dispatch(fetchOffersApiAction());
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);


			expect(extractedActionsTypes).toEqual([
				fetchOffersApiAction.pending.type,
				fetchOffersApiAction.rejected.type,
			]);
		});

	});

	describe('fetchOfferApiAction', () => {

		it('should dispatch "fetchOfferApiAction.pending" and "fetchOfferApiAction.fulfilled" when server response 200', async () => {
			const mockOffer = createFullMockOffer();
			const offerId = mockOffer.id;
			const mockOfferPayload = {offerId};
			mockAxiosAdapter.onGet(`${ApiRoute.getOffer}/${offerId}`).reply(200, mockOffer);

			await store.dispatch(fetchOfferApiAction(mockOfferPayload));
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const fetchOfferApiActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersApiAction.fulfilled>;

			expect(extractedActionsTypes).toEqual([
				fetchOfferApiAction.pending.type,
				fetchOfferApiAction.fulfilled.type,
			]);
			expect(fetchOfferApiActionFulfilled.payload).toEqual(mockOffer);
		});

		it('should dispatch "fetchOfferApiAction.pending" and "fetchOfferApiAction.rejected" when server response 400', async () => {
			const offerId = 'test-id';
			mockAxiosAdapter.onGet(`${ApiRoute.getOffer}/${offerId}`).reply(400, []);

			await store.dispatch(fetchOfferApiAction({offerId}));
			const actions = extractActionsTypes(store.getActions());


			expect(actions).toEqual([
				fetchOfferApiAction.pending.type,
				fetchOfferApiAction.rejected.type,
			]);
		});

	});

	describe('fetchReviewsApiAction', () => {

		it('should dispatch "fetchReviewsApiAction.pending" and "fetchReviewsApiAction.fulfilled" when server response 200', async () => {
			const mockReviews = [createMockReview()];
			const offerId = mockReviews[0].id;
			const mockReviewPayload = {offerId};
			mockAxiosAdapter.onGet(`${ApiRoute.getReviews}/${offerId}`).reply(200, mockReviews);

			await store.dispatch(fetchReviewsApiAction(mockReviewPayload));
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const fetchReviewsApiActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersApiAction.fulfilled>;

			expect(extractedActionsTypes).toEqual([
				fetchReviewsApiAction.pending.type,
				fetchReviewsApiAction.fulfilled.type,
			]);
			expect(fetchReviewsApiActionFulfilled.payload).toEqual(mockReviews);
		});

		it('should dispatch "fetchReviewsApiAction.pending" and "fetchReviewsApiAction.rejected" when server response 400', async () => {
			const offerId = 'test-id';
			mockAxiosAdapter.onGet(`${ApiRoute.getReviews}/${offerId}`).reply(400, []);

			await store.dispatch(fetchReviewsApiAction({offerId}));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				fetchReviewsApiAction.pending.type,
				fetchReviewsApiAction.rejected.type,
			]);
		});

	});

	describe('fetchNeighborsApiAction', () => {

		it('should dispatch "fetchNeighborsApiAction.pending" and "fetchNeighborsApiAction.fulfilled" when server response 200', async () => {
			const mockNeighbors = [createMockOffer(), createMockOffer()];
			const offerId = mockNeighbors[0].id;
			const mockNeighborsPayload = {offerId};
			mockAxiosAdapter.onGet(ApiRoute.getNearby.replace('{offerId}', offerId)).reply(200, mockNeighbors);

			await store.dispatch(fetchNeighborsApiAction(mockNeighborsPayload));
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const fetchNeighborsApiActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNeighborsApiAction.fulfilled>;

			expect(extractedActionsTypes).toEqual([
				fetchNeighborsApiAction.pending.type,
				fetchNeighborsApiAction.fulfilled.type,
			]);
			expect(fetchNeighborsApiActionFulfilled.payload).toEqual(mockNeighbors);
		});

		it('should dispatch "fetchNeighborsApiAction.pending" and "fetchNeighborsApiAction.rejected" when server response 400', async () => {
			const offerId = 'test-id';
			mockAxiosAdapter.onGet(ApiRoute.getNearby.replace('{offerId}', offerId)).reply(400, []);

			await store.dispatch(fetchNeighborsApiAction({offerId}));
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				fetchNeighborsApiAction.pending.type,
				fetchNeighborsApiAction.rejected.type,
			]);
		});

	});

	describe('fetchFavoritesApiAction', () => {

		it('should dispatch "fetchFavoritesApiAction.pending" and "fetchFavoritesApiAction.fulfilled" when server response 200', async () => {
			let mockFavorites = [createMockOffer(), createMockOffer()];
			mockFavorites = mockFavorites.map((mockOffer) => ({...mockOffer, isFavorite: true}));
			mockAxiosAdapter.onGet(ApiRoute.getFavorites).reply(200, mockFavorites);

			await store.dispatch(fetchFavoritesApiAction());
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const fetchFavoritesApiActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesApiAction.fulfilled>;

			expect(extractedActionsTypes).toEqual([
				fetchFavoritesApiAction.pending.type,
				fetchFavoritesApiAction.fulfilled.type,
			]);
			expect(fetchFavoritesApiActionFulfilled.payload).toEqual(mockFavorites);
		});

		it('should dispatch "fetchNeighborsApiAction.pending" and "fetchNeighborsApiAction.rejected" when server response 400', async () => {
			mockAxiosAdapter.onGet(ApiRoute.getFavorites).reply(400, []);

			await store.dispatch(fetchFavoritesApiAction());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				fetchFavoritesApiAction.pending.type,
				fetchFavoritesApiAction.rejected.type,
			]);
		});

	});

	describe('loginAction', () => {
		it('should dispatch "loginAction.pending" and "loginAction.fulfilled" when server response 201', async () => {
			const mockAuthPayload = {email: 'test@mail.com', password: 'test1'};
			const mockUserResponse = {
				name: 'Billy Bones',
				avatarUrl: 'http://avatars.com/random.jpg',
				isPro: true,
				email: 'test.billy@bones.mail',
				token: 'test-token',
			};
			mockAxiosAdapter.onPost(ApiRoute.Login).reply(201, mockUserResponse);

			await store.dispatch(loginAction(mockAuthPayload));
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const loginActionFulfilled = emittedActions.at(3) as ReturnType<typeof loginAction.fulfilled>;

			expect(extractedActionsTypes).toEqual([
				loginAction.pending.type,
				fetchOffersApiAction.pending.type,
				fetchFavoritesApiAction.pending.type,
				loginAction.fulfilled.type,
			]);
			expect(loginActionFulfilled.payload).toEqual(mockUserResponse);
		});

		it('should call "saveToken" once with the received token', async () => {
			const mockAuthPayload = {email: 'test@mail.com', password: 'test1'};
			const mockUserResponse = {
				name: 'Billy Bones',
				avatarUrl: 'http://avatars.com/random.jpg',
				isPro: true,
				email: 'test.billy@bones.mail',
				token: 'test-token',
			};
			mockAxiosAdapter.onPost(ApiRoute.Login).reply(201, mockUserResponse);
			const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

			await store.dispatch(loginAction(mockAuthPayload));

			expect(mockSaveToken).toBeCalledTimes(1);
			expect(mockSaveToken).toHaveBeenCalledWith(mockUserResponse.token);
		});
	});

	describe('logoutAction', () => {
		it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" when server response 204', async () => {
			mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

			await store.dispatch(logoutAction());
			const actions = extractActionsTypes(store.getActions());

			expect(actions).toEqual([
				logoutAction.pending.type,
				favoritesActions.dropFavorites.type,
				fetchOffersApiAction.pending.type,
				logoutAction.fulfilled.type,
			]);
		});

		it('should one call "dropToken" with "logoutAction"', async () => {
			mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);
			const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

			await store.dispatch(logoutAction());

			expect(mockDropToken).toBeCalledTimes(1);
		});

	});

	describe('sendFavoriteStatusApiAction', () => {
		it('should dispatch "sendFavoriteStatusApiAction.pending" and "sendFavoriteStatusApiAction.fulfilled" when server response 200', async () => {
			const mockFavoriteResponse = createMockOffer();
			mockFavoriteResponse.isFavorite = true;
			const offerId = mockFavoriteResponse.id;
			mockAxiosAdapter.onPost(`${ApiRoute.postFavorite}/${offerId}/1`).reply(200, mockFavoriteResponse);

			await store.dispatch(sendFavoriteStatusApiAction({offerId, status: FavoritesStatus.Added}));
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const sendFavoriteStatusApiActionFulfilled = emittedActions.at(1) as ReturnType<typeof sendFavoriteStatusApiAction.fulfilled>;

			expect(extractedActionsTypes).toEqual([
				sendFavoriteStatusApiAction.pending.type,
				sendFavoriteStatusApiAction.fulfilled.type,
			]);
			expect(sendFavoriteStatusApiActionFulfilled.payload).toEqual({offer: mockFavoriteResponse, status: FavoritesStatus.Added});
		});

	});

	describe('sendReviewApiAction', () => {
		it('should dispatch "sendReviewApiAction.pending" and "sendReviewApiAction.fulfilled" when server response 200', async () => {
			const mockReviewResponse = createMockReview();
			const {id: offerId, comment, rating} = mockReviewResponse;
			const mockReviewPayload = {offerId, comment,	rating};
			mockAxiosAdapter.onPost(`${ApiRoute.postReview}/${offerId}`).reply(200, mockReviewResponse);

			await store.dispatch(sendReviewApiAction(mockReviewPayload));
			const emittedActions = store.getActions();
			const extractedActionsTypes = extractActionsTypes(emittedActions);
			const sendReviewApiActionFulfilled = emittedActions.at(1) as ReturnType<typeof sendReviewApiAction.fulfilled>;

			expect(extractedActionsTypes).toEqual([
				sendReviewApiAction.pending.type,
				sendReviewApiAction.fulfilled.type,
			]);
			expect(sendReviewApiActionFulfilled.payload).toEqual(mockReviewResponse);
		});

	});

});
