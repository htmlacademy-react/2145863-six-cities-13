import { CITIES } from '../../constants';
import { getOfferList } from '../../model';
import type { OffersByCity } from '../../types/offer';
import { convertOffersToOffersByCity } from '../../utils/convert';

export type LoaderResponse = {
	cities: string[];
	offersByCity: OffersByCity;
}

function loader(): LoaderResponse | Response {
	const offers = getOfferList();
	return {
		cities: Array.from(CITIES),
		offersByCity: convertOffersToOffersByCity(offers),
	};
}

export {loader};
