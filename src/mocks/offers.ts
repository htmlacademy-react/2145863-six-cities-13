import {
	ServerOffer,
	ServerFullOffer,
	ServerLocation,
	CityName,
	Rating,
	ServerComment,
	ServerCommentWithOfferId} from '../types/offer';
import {faker} from '@faker-js/faker';
import { CITIES, CitiesGPS, OFFER_TYPES, LOCATION_RADIUS } from '../constants';
import { TemporalData } from '../constants';

function getMockLocation(city: CityName, isOffer: boolean = true): ServerLocation {

	if (isOffer) {
		const placeLocation = faker.location.nearbyGPSCoordinate({
			isMetric: true,
			origin: [CitiesGPS[city].latitude, CitiesGPS[city].longitude],
			radius: LOCATION_RADIUS,
		});

		return {
			latitude: placeLocation.at(0) as number,
			longitude: placeLocation.at(1) as number,
			zoom: faker.number.int({min: 1, max: 16}),
		}
	}

	return {
		latitude: CitiesGPS[city].latitude,
		longitude: CitiesGPS[city].longitude,
		zoom: faker.number.int({min: 1, max: 16}),
	};
}

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
			rating: faker.number.int({min: 1, max: 5}) as Rating,
			previewImage: faker.image.urlLoremFlickr({category: 'interior,room'}),
	}
}

function createFullMockOffer(mockOffer: ServerOffer): ServerFullOffer {
	return {
		...mockOffer,
		description: faker.commerce.productDescription(),
    bedrooms: faker.number.int({min: 1, max: 5}),
    goods: Array.from({length: faker.number.int({min: 0, max: 10})}, faker.commerce.product),
    host: {
        name: faker.person.fullName(),
        avatarUrl: faker.image.avatar(),
        isPro: faker.datatype.boolean(),
    },
    images: Array(faker.number.int({min: 0, max: 5}))
							.map(() => faker.image.urlLoremFlickr({category: 'apartment'})),
    maxAdults: faker.number.int({min: 1, max: 5}),
	}
}

function createMockComents(): ServerComment {
	return {
		id: faker.string.nanoid(),
    date: faker.date.between(
			{from: TemporalData.comment_min_date, to: TemporalData.comment_max_date})
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

const offers: ServerOffer[] = Array.from({length: TemporalData.offerAmount as number}, createMockOffer);
const fullOffers: ServerFullOffer[] = offers.map((offer) => createFullMockOffer(offer));
const comments: ServerCommentWithOfferId[] = [];

offers.forEach((offer) => {
	const commnetsAmoutn = faker.number.int({min: 0, max: TemporalData.comment_max_amount as number});

	for (let i=0; i < commnetsAmoutn + 1; i++) {
		comments.push({...createMockComents(), offerId: offer.id});
		console.log();
	}
});

export {offers, fullOffers, comments};
