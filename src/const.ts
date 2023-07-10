export const Settings = {
	totalPlaces: 312,
	favoriteCount: 3,
} as const;

export const AppRoute = {
  root: '/',
  login: '/login',
	offer: '/offer/:id',
	favorites: '/favorites',
} as const;

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
