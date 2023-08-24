import { ServerLocation } from '../types/offer';

const PROJECT_NAME = '6 Cities';
const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT = 'Popular';
const MAX_NEIGHBOUR = 3;
const MAX_COMMENTS = 10;

const CITIES = [
	'Paris',
	'Cologne',
	'Brussels',
	'Amsterdam',
	'Hamburg',
	'Dusseldorf'
] as const;

const CitiesGPS: Record<string, ServerLocation> = {
	Paris: 			{latitude: 48.855328, longitude: 2.345482, zoom: 12},
	Amsterdam: 	{latitude: 52.354551, longitude: 4.894924, zoom: 12},
	Cologne:	 	{latitude: 50.935577, longitude: 6.961134, zoom: 12},
	Brussels: 	{latitude: 50.845974, longitude: 4.352818, zoom: 12},
	Hamburg: 		{latitude: 53.544951, longitude: 9.994463, zoom: 12},
	Dusseldorf: {latitude: 51.220732, longitude: 6.778577, zoom: 12},
} as const;

const OFFER_TYPES = [
	'room',
	'apartment',
	'house',
	'hotel',
] as const;

const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const enum RequestStatus {
	Idle = 'IDLE',
	Pending = 'PENDING',
	Success = 'FULFILLED',
  Error = 'REJECTED',
}

const enum FavoritesStatus {
	Removed = 0,
	Added = 1,
}

const SortMethod = {
	Popular: 'Popular',
	PriceToHight: 'PriceToHight',
	PriceToLow: 'PriceToLow',
	TopRatedFirst: 'TopRatedFirst',
} as const;

export {
	PROJECT_NAME,
	CITIES, DEFAULT_CITY, CitiesGPS,
	OFFER_TYPES,
	MAX_NEIGHBOUR, MAX_COMMENTS,
	SortMethod, DEFAULT_SORT,
	AuthorizationStatus,
	RequestStatus,
	FavoritesStatus,
};
