// import { getOfferList } from '../../model';
import type { OffersByCity } from '../../types/offer';
import { convertOffersToOffersByCity } from '../../utils/convert';

export type LoaderResponse = {
	offersByCity: OffersByCity;
	favoriteAmount: number;
	cities: string[];
}

function loader(): LoaderResponse | Response {
	// const offers = getOfferList();
	// const favoriteAmount = offers.filter((offer) => offer.isFavorite).length;
	// const favoriteOffers = offers.filter((offer) => offer.isFavorite);
	// const favoriteOffersByCity = convertOffersToOffersByCity(favoriteOffers);

	return {
		// offersByCity: favoriteOffersByCity,
		// favoriteAmount,
		// cities: Object.keys(favoriteOffersByCity),
	};
	return {
		offersByCity: [],
		favoriteAmount: 0,
		cities: Object.keys(favoriteOffersByCity),
	};
}

export {loader};
