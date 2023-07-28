import { faker } from '@faker-js/faker';
import { ServerOffer,	ServerFullOffer } from '../types/offer';

function createFullMockOffer(mockOffer: ServerOffer): ServerFullOffer {
	return {
		...mockOffer,
		description: faker.helpers.multiple(faker.commerce.productDescription, {count: {min: 1, max: 4}}),
		bedrooms: faker.number.int({min: 1, max: 5}),
		goods: Array.from({length: faker.number.int({min: 4, max: 10})}, faker.commerce.product),
		host: {
			name: faker.person.fullName(),
			avatarUrl: faker.image.avatar(),
			isPro: faker.datatype.boolean(),
		},
		images: Array(faker.number.int({min: 1, max: 6}))
			.fill(null)
			.map(() => faker.image.urlLoremFlickr({width: 260, height: 200, category: 'interior,room,modern,apartment'})),
		maxAdults: faker.number.int({min: 1, max: 5}),
	};
}

export {createFullMockOffer};
