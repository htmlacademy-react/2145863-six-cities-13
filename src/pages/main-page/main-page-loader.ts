import { CITIES } from '../../constants';
import { getOfferList } from '../../model';
import type { OffersByCity } from '../../types/offer';
import { converOffersToOffersByCity } from '../../utils/convert';

export type LoaderResponse = {
	cities: string[];
	offersByCity: OffersByCity;
	favoriteAmount: number;
}

function loader(): LoaderResponse | Response {
	const offers = getOfferList();
	const favoriteAmount = offers.filter((offer) => offer.isFavorite).length;
	return {
		cities: Array.from(CITIES),
		offersByCity: converOffersToOffersByCity(offers),
		favoriteAmount,
	};
}

export {loader};
