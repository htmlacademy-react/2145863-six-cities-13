const Settings = {
	totalPlaces: 312,
	favoriteCount: 3,
} as const;

const AppRoute = {
	root: '/',
	login: '/login',
	offer: '/offer/:id',
	favorites: '/favorites',
} as const;

const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

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

export {
	Settings,
	AppRoute,
	AuthorizationStatus,
	CITIES, OFFER_TYPES,
}


