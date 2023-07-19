const PROJECT_NAME = '6 Cities';

const CITIES = [
	'Paris',
	'Amsterdam',
	'Cologne',
	'Brussels',
	'Hamburg',
	'Dusseldorf'
] as const;

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

export {PROJECT_NAME, CITIES, OFFER_TYPES, AuthorizationStatus};
