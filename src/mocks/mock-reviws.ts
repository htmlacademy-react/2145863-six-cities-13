import type { Rating, ServerRewiew } from '../types/offer';
import { faker } from '@faker-js/faker';
import { TemporalData } from '../constants';

function createMockReviw(): ServerRewiew {
	return {
		id: faker.string.nanoid(),
		date: faker.date.between(
			{from: TemporalData.CommentMinDate, to: TemporalData.CommentMaxDate})
			.toISOString(),
		user: {
			name: faker.person.firstName(),
			avatarUrl: faker.image.avatar(),
			isPro: faker.datatype.boolean(),
		},
		comment: Array.from({length: faker.number.int({min: 1, max: 5})}, faker.company.buzzPhrase).join(' '),
		rating: faker.number.int({min: 1, max: 5}) as Rating,
	};
}

export {createMockReviw};

