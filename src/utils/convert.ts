import type { OffersByCity, ServerOffer } from '../types/offer';

function converOffersToOffersByCity(offers: ServerOffer[]) {
	const offersByCity: OffersByCity = {};

	for (const offer of offers) {
		const city = offer.city.name;

		if (city in offersByCity) {
			offersByCity[city].push(offer);
			continue;
		}

		offersByCity[city] = [offer];
	}

	return offersByCity;
}

export {converOffersToOffersByCity};
