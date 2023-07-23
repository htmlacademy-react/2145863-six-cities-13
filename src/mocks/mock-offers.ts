import { CITIES, OFFER_TYPES } from '../constants';
import type { ServerOffer,	Rating } from '../types/offer';
import { faker } from '@faker-js/faker';
import { getMockLocation } from './mock-locations';

function createMockOffer(): ServerOffer {
	const city = faker.helpers.arrayElement(CITIES);
	const type = faker.helpers.arrayElement(OFFER_TYPES);
	let title = `${faker.company.buzzAdjective()} ${type} ${faker.company.buzzPhrase()}`;
	title = title[0]?.toUpperCase() + title?.slice(1);

	return {
		id: faker.string.nanoid(),
		title: title,
		type: type,
		price: faker.number.int({min: 50, max: 1500}),
		city: {
			name: city,
			location: getMockLocation(city, false),
		},
		location: getMockLocation(city),
		isFavorite: faker.datatype.boolean(),
		isPremium: faker.datatype.boolean(),
		rating: faker.number.float({min: 1, max: 5, precision: 0.1}) as Rating,
		previewImage: faker.image.urlLoremFlickr({width: 260, height: 200, category: 'interior,room,modern,apartment'}),
	};
}

export {createMockOffer};
