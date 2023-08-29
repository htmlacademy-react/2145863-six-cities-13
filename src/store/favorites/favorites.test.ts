import { describe } from 'vitest';
import { FavoritesStatus, RequestStatus } from '../../constants/common';
import { favoritesReducer } from './favorites.slice';
import { createMockOffer } from '../../utils/mocks';
import { fetchFavoritesApiAction, sendFavoriteStatusApiAction } from '../api-actions';

describe('Favorite slice (reducer)', () => {
	const emptyAction = { type: '' };

	it('Should return initial state with empty action', () => {
		const expectedState = {
			favorites: [createMockOffer(), createMockOffer()],
			favoritesFetchingStatus: RequestStatus.Pending,
			favoriteAmount: 10,
		};

		const result = favoritesReducer(expectedState, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should return default initial state with empty action and undefined state', () => {
		const expectedState = {
			favorites: [],
			favoritesFetchingStatus: RequestStatus.Idle,
			favoriteAmount: 0,
		};

		const result = favoritesReducer(undefined, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('should set "favoritesFetchingStatus" with "fetchFavoritesApiAction.pending" action', () => {
		const expectedFavoritesFetchingStatus = RequestStatus.Pending;
		const result = favoritesReducer(undefined, fetchFavoritesApiAction.pending);
		expect(result.favoritesFetchingStatus).toBe(
			expectedFavoritesFetchingStatus
		);
	});

	it('should set right "favoritesFetchingStatus", "favorites" and "favoriteAmount" with "fetchFavoritesApiAction.fulfilled" action', () => {
		const favorites = [createMockOffer(), createMockOffer()];
		const expectedState = {
			favorites,
			favoritesFetchingStatus: RequestStatus.Success,
			favoriteAmount: favorites.length,
		};

		const result = favoritesReducer(
			undefined,
			fetchFavoritesApiAction.fulfilled(favorites, '', undefined)
		);

		expect(result).toEqual(expectedState);
	});

	it('should set "favoritesFetchingStatus" with "fetchFavoritesApiAction.rejected" action', () => {
		const expectedFavoritesFetchingStatus = RequestStatus.Error;
		const result = favoritesReducer(undefined, fetchFavoritesApiAction.rejected);
		expect(result.favoritesFetchingStatus).toBe(expectedFavoritesFetchingStatus);
	});

	it('should add element to "favorites" and increment "favoriteAmount" with "sendFavoriteStatusApiAction.fulfilled" action', () => {
		const initialFavorites = [createMockOffer(), createMockOffer()];
		const extraFavorite = createMockOffer();
		const initialState = {
			favorites: initialFavorites,
			favoritesFetchingStatus: RequestStatus.Success,
			favoriteAmount: initialFavorites.length,
		};
		const expectedState = {
			favorites: [...initialFavorites, extraFavorite],
			favoritesFetchingStatus: RequestStatus.Success,
			favoriteAmount: initialFavorites.length + 1,
		};

		const result = favoritesReducer(
			initialState,
			sendFavoriteStatusApiAction.fulfilled(
				{
					offer: extraFavorite,
					status: FavoritesStatus.Added,
				},
				'',
				{
					offerId: extraFavorite.id,
					status: FavoritesStatus.Added,
				}
			)
		);

		expect(result).toEqual(expectedState);
	});

	it('should remove element from "favorites" and decrement "favoriteAmount" with "sendFavoriteStatusApiAction.fulfilled" action', () => {
		const extraFavorite = createMockOffer();
		const expectedFavorites = [createMockOffer(), createMockOffer()];
		const initialFavorites = [...expectedFavorites, extraFavorite];
		const initialState = {
			favorites: initialFavorites,
			favoritesFetchingStatus: RequestStatus.Success,
			favoriteAmount: initialFavorites.length,
		};
		const expectedState = {
			favorites: expectedFavorites,
			favoritesFetchingStatus: RequestStatus.Success,
			favoriteAmount: expectedFavorites.length,
		};

		const result = favoritesReducer(
			initialState,
			sendFavoriteStatusApiAction.fulfilled(
				{
					offer: extraFavorite,
					status: FavoritesStatus.Removed,
				},
				'',
				{
					offerId: extraFavorite.id,
					status: FavoritesStatus.Added,
				}
			)
		);

		expect(result).toEqual(expectedState);
	});

});
