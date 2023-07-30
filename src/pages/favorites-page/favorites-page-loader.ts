import { getOfferList } from '../../model';
import type { OffersByCity } from '../../types/offer';
import { converOffersToOffersByCity } from '../../utils/convert';

export type LoaderResponse = {
	offersByCity: OffersByCity;
	favoriteAmount: number;
	cities: string[];
}

function loader(): LoaderResponse | Response {
	const offers = getOfferList();
	const favoriteAmount = offers.filter((offer) => offer.isFavorite).length;
	const favoriteOffers = offers.filter((offer) => offer.isFavorite);
	const favoriteOffersByCities = converOffersToOffersByCity(favoriteOffers);

	return {
		offersByCity: favoriteOffersByCities,
		favoriteAmount,
		cities: Object.keys(favoriteOffersByCities),
	};
}

export {loader};
