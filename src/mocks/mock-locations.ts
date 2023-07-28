import { CitiesGPS, LOCATION_RADIUS } from '../constants';
import type { ServerLocation } from '../types/offer';
import { faker } from '@faker-js/faker';

function getMockLocation(city: string, isOffer = true): ServerLocation {

	if (isOffer) {
		const placeLocation = faker.location.nearbyGPSCoordinate({
			isMetric: true,
			origin: [CitiesGPS[city].latitude, CitiesGPS[city].longitude],
			radius: LOCATION_RADIUS,
		});

		return {
			latitude: placeLocation[0],
			longitude: placeLocation[1],
			zoom: faker.number.int({min: 1, max: 16}),
		};
	}

	return {
		latitude: CitiesGPS[city].latitude,
		longitude: CitiesGPS[city].longitude,
		zoom: faker.number.int({min: 1, max: 16}),
	};
}

export {getMockLocation};
