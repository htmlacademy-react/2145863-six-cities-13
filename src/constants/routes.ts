const AppRoute = {
	Main: '/',
	Login: '/login',
	Offer: '/offer',
	Favorites: '/favorites',
	NotFound: '/not-found',
} as const;

const ApiRoute = {
	getOffers: '/offers',
	getOffer: '/offers',
	getNearby: '/offers/{offerId}/nearby',
	getFavorites: '/favorite',
	postFavorite: '/favorite/{offerId}/{status}',
	getReviews: '/comments',
	postReview: '/comments',
	Login: '/login',
	Logout: '/logout',
} as const;

export {AppRoute, ApiRoute};
