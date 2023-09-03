import type { ServerOffer,	Rating, ServerFullOffer, ServerReview } from '../types/offer';
import { AuthorizationStatus, CITIES, CitiesGPS, NameSpace, OFFER_TYPES } from '../constants';
import { faker } from '@faker-js/faker';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { DEFAULT_CITY, RequestStatus, SortMethod } from '../constants/common';
import { UserState } from '../store/user/user.slice';
import { OffersState } from '../store/offers/offers.slice';
import { OfferState } from '../store/offer/offer.slice';
import { FavoritesState } from '../store/favorites/favorites.slice';

export type AppThunkDispatch = ThunkDispatch<
	State,
	ReturnType<typeof createAPI>,
	Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
	actions.map(({ type }) => type);

const LOCATION_RADIUS = 5;

const TemporalData = {
	OfferAmount: 50,
	FavoriteCount: 5,
	CommentMaxAmount: 5,
	CommentMinDate: '2023-01-01T00:00:00.000Z',
	CommentMaxDate: '2023-07-13T21:04:55.781Z',
} as const;

type Location = {
	latitude: number;
	longitude: number;
	zoom: number;
}

const cities = Array.from(CITIES);

function getMockLocation(city: string = cities[0], isOffer = true): Location {

	if (isOffer) {
		const placeLocation = faker.location.nearbyGPSCoordinate({
			isMetric: true,
			origin: [CitiesGPS[city].latitude, CitiesGPS[city].longitude],
			radius: LOCATION_RADIUS,
		});

		return {
			latitude: placeLocation[0],
			longitude: placeLocation[1],
			zoom: faker.number.int({min: 1, max: 16}),
		};
	}

	return {
		latitude: CitiesGPS[city].latitude,
		longitude: CitiesGPS[city].longitude,
		zoom: faker.number.int({min: 1, max: 16}),
	};
}

function createMockOffer(): ServerOffer {
	const city = faker.helpers.arrayElement(CITIES);
	const type = faker.helpers.arrayElement(OFFER_TYPES);
	let title = `${faker.company.buzzAdjective()} ${type} ${faker.company.buzzPhrase()}`;
	title = title[0]?.toUpperCase() + title?.slice(1);

	return {
		id: faker.string.nanoid(),
		title: title,
		type: type,
		price: faker.number.int({min: 50, max: 1500}),
		city: {
			name: city,
			location: getMockLocation(city, false),
		},
		location: getMockLocation(city),
		isFavorite: faker.datatype.boolean(),
		isPremium: faker.datatype.boolean(),
		rating: faker.number.float({min: 1, max: 5, precision: 0.1}) as Rating,
		previewImage: faker.image.urlLoremFlickr({width: 260, height: 200, category: 'interior,room,modern,apartment'}),
	};
}

function createFullMockOffer(mockOffer?: ServerOffer): ServerFullOffer {
	if (mockOffer === undefined) {
		mockOffer = createMockOffer();
	}

	return {
		...mockOffer,
		description: faker.helpers.multiple(faker.commerce.productDescription.bind(null), {count: {min: 1, max: 4}}),
		bedrooms: faker.number.int({min: 1, max: 5}),
		goods: Array.from({length: faker.number.int({min: 4, max: 10})}, faker.commerce.product.bind(null)),
		host: {
			name: faker.person.fullName(),
			avatarUrl: faker.image.avatar(),
			isPro: faker.datatype.boolean(),
		},
		images: Array(faker.number.int({min: 1, max: 6}))
			.fill(null)
			.map(() => faker.image.urlLoremFlickr({width: 260, height: 200, category: 'interior,room,modern,apartment'})),
		maxAdults: faker.number.int({min: 1, max: 5}),
	};
}

function createMockReview(): ServerReview {
	return {
		id: faker.string.nanoid(),
		date: faker.date.between(
			{from: TemporalData.CommentMinDate, to: TemporalData.CommentMaxDate})
			.toISOString(),
		user: {
			name: faker.person.firstName(),
			avatarUrl: faker.image.avatar(),
			isPro: faker.datatype.boolean(),
		},
		comment: Array.from({length: faker.number.int({min: 1, max: 5})}, faker.company.buzzPhrase.bind(null)).join(' '),
		rating: faker.number.int({min: 1, max: 5}) as Rating,
	};
}

const createFakeStore = (initialState?: Partial<State>): State => ({
	[NameSpace.User]: {
		authorizationStatus: AuthorizationStatus.Unknown,
		loginSendingStatus: RequestStatus.Idle,
		user: null,
	} as UserState,
	[NameSpace.Offers]: {
		city: DEFAULT_CITY,
		sort: SortMethod.Popular as string,
		activeOffer: null,
		allOffers: [],
		allOffersFetchingStatus: RequestStatus.Idle,
	} as OffersState,
	[NameSpace.Offer]: {
		offer: null,
		offerFetchingStatus: RequestStatus.Idle,
		neighborPlaces: [],
		reviews: [],
		reviewsFetchingStatus:  RequestStatus.Idle,
		reviewSendingStatus:  RequestStatus.Idle,
	} as OfferState,
	[NameSpace.Favorites]: {
		favorites: [],
		favoritesFetchingStatus: RequestStatus.Idle,
		favoriteAmount: 0,
	} as FavoritesState,
	...(initialState ?? {}),
});

export {createMockOffer, createFullMockOffer, createMockReview, createFakeStore};
