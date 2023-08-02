import { ServerLocation } from '../types/offer';

const PROJECT_NAME = '6 Cities';
const DEFAULT_CITY = 'Paris';

const CITIES = [
	'Paris',
	'Amsterdam',
	'Cologne',
	'Brussels',
	'Hamburg',
	'Dusseldorf'
] as const;

const CitiesGPS: Record<string, ServerLocation> = {
	Paris: 			{latitude: 48.855328, longitude: 2.345482, zoom: 11},
	Amsterdam: 	{latitude: 52.354551, longitude: 4.894924, zoom: 11},
	Cologne:	 	{latitude: 50.935577, longitude: 6.961134, zoom: 11},
	Brussels: 	{latitude: 50.845974, longitude: 4.352818, zoom: 11},
	Hamburg: 		{latitude: 53.544951, longitude: 9.994463, zoom: 11},
	Dusseldorf: {latitude: 51.220732, longitude: 6.778577, zoom: 11},
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

const SortMethod = {
	// ['Popular']: 'popular',
	['PriceToHight']: 'price-to-hight',
	['PriceToLow']: 'price-to-low',
	['TopRatedFirst']: 'top-rated-first',
} as const;

export {PROJECT_NAME, CITIES, CitiesGPS, DEFAULT_CITY, OFFER_TYPES, SortMethod, AuthorizationStatus};
