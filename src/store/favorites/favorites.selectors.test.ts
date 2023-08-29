import { describe } from 'vitest';
import { NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { getFavoriteAmount, getFavorites, getFavoritesFetchingStatus } from './favorites.selectors';
import { createMockOffer } from '../../utils/mocks';

describe('Favorites selectors', () => {
	const state = {
		[NameSpace.Favorites]: {
			favorites: [createMockOffer(), createMockOffer()],
			favoritesFetchingStatus: RequestStatus.Pending,
			favoriteAmount: 10,
		},
	};

	it('should return favorites from state', () => {
		const {favorites} = state[NameSpace.Favorites];
		const result = getFavorites(state);
		expect(result).toEqual(favorites);
	});

	it('should return favoritesStatus from state', () => {
		const {favoritesFetchingStatus} = state[NameSpace.Favorites];
		const result = getFavoritesFetchingStatus(state);
		expect(result).toBe(favoritesFetchingStatus);
	});

	it('should return favoriteAmount from state', () => {
		const {favoriteAmount} = state[NameSpace.Favorites];
		const result = getFavoriteAmount(state);
		expect(result).toBe(favoriteAmount);
	});


});
