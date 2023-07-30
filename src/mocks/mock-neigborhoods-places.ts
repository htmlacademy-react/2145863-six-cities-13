import { offers } from '.';
import { ServerOffer } from '../types/offer';
import { haversineDistance } from '../utils/distanse';

/** Моковый список предложений по соседству */
function getMockNeighbourPlaces(offerId: string): ServerOffer[] {
	const baseOffer = offers.find((offer) => offer.id === offerId);
	const city = baseOffer?.city.name;

	/** список всех предложений в городе дополненный дистанцией до базового офера*/
	const offersInCity = offers
		.filter((offer) => offer.city.name === city)
		.map((offer) => ({
			... offer,
			distance: haversineDistance(
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						baseOffer!.location.latitude,
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						baseOffer!.location.longitude,
						offer.location.latitude,
						offer.location.longitude,
			),
		}));
	const nearestOffers = offersInCity
		.slice()
		.sort((offerA, offerB) => offerA.distance > offerB.distance ? 1 : -1);

	return nearestOffers.slice(1, 4);
}

export {getMockNeighbourPlaces};
