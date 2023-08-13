const AppRoute = {
	Main: '/',
	Login: '/login',
	Offer: '/offer/:id',
	Favorites: '/favorites',
} as const;

const ApiRoute = {
	getOffers: '/six-cities/offers',
	getOffer: '/six-cities/offers',
	getNearby: '/six-cities/offers/{offerId}/nearby',
	getFavorites: '/six-cities/favorite',
	postFavorite: '/six-cities/favorite/{offerId}/{status}',
	getComments: '/six-cities/comments/{offerId}	',
	postComment: '/six-cities/comments/{offerId}',
	Login: '/six-cities/login',
	Logout: '/six-cities/logout',
} as const;

export {AppRoute, ApiRoute};
