import { describe } from 'vitest';
import { RequestStatus } from '../../constants/common';
import { favoritesReducer } from './favorites.slice';
import { ServerOffer } from '../../types/offer';

describe ('Favorite slice (reducer)', () => {
	const mockOffers = [
		{
			id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
			title: 'Beautiful & luxurious studio at great location',
			type: 'apartment',
			price: 120,
			city: {
				name: 'Amsterdam',
				location: {
					latitude: 52.35514938496378,
					longitude: 4.673877537499948,
					zoom: 8
				}
			},
			location: {
				latitude: 52.35514938496378,
				longitude: 4.673877537499948,
				zoom: 8
			},
			isFavorite: false,
			isPremium: false,
			rating: 4,
			previewImage: 'https://url-to-image/image.png'
		},
	] as ServerOffer[];

	const emptyAction = {type: ''};

	it('Should return initial state with empty action', () => {
		const expectedState = {
			favorites: mockOffers,
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
});
