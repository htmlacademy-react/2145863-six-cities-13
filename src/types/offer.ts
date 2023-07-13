import { CITIES, OFFER_TYPES } from "../constants";

type CityName = typeof CITIES[number];
type OfferType = typeof OFFER_TYPES[number];
type Rating = 1 | 2 | 3 | 4 | 5;

type Location = {
	latitude: number;
	longitude: number;
	zoom: number;
}

type ServerOffer = {
	id: string;
	title: string;
	type: OfferType;
	price: number;
	city: {
		name: CityName;
		location: Location;
	};
	location: Location;
	isFavorite: boolean;
	isPremium: boolean;
	rating: Rating;
	previewImage: string;
};

type ServerFullOffer = Omit<ServerOffer, 'previewImage'> & {
	description: string;
	bedrooms: number;
	goods: string[];
	host: {
		name: string;
		avatarUrl: string;
		isPro: boolean;
	};
	images: string[];
	maxAdults: number;
};

export type {ServerOffer, ServerFullOffer};
