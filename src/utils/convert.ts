import { SortMethod } from '../constants';
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

const SortMap: Record<string, {sortFunc: (a: ServerOffer, b: ServerOffer) => number; title: string}> = {
	[SortMethod.Popular]: {
		sortFunc: () => 0,
		title: 'Popular'
	},
	[SortMethod.PriceToHight]: {
		sortFunc: (a, b) => a.price > b.price ? 1 : -1,
		title: 'Price: low to high'
	},
	[SortMethod.PriceToLow]: {
		sortFunc: (a, b) => a.price < b.price ? 1 : -1,
		title: 'Price: high to low'
	},
	[SortMethod.TopRatedFirst]: {
		sortFunc: (a, b) => a.rating < b.rating ? 1 : -1,
		title: 'Top rated first'
	},
};

function getPluralPlaces(amount: number, word: string) {
	return amount === 1 ? word : `${word }s`;
}

function capitalize(str: string): string {
	if (str.length > 0) {
		return str[0].toUpperCase() + str.slice(1);
	}
	return str;
}

export {convertOffersToOffersByCity, SortMap, getPluralPlaces, capitalize};
