import type { OffersByCity, ServerOffer } from '../types/offer';

function convertOffersToOffersByCity(offers: ServerOffer[]): Record<string, ServerOffer[]> {
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

export {convertOffersToOffersByCity};
