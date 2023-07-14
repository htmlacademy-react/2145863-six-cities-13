import { CITIES, OFFER_TYPES } from "../constants";

type CityName = typeof CITIES[number];
type OfferType = typeof OFFER_TYPES[number];
type Rating = 1 | 2 | 3 | 4 | 5;

type ServerLocation = {
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
		location: ServerLocation;
	};
	location: ServerLocation;
	isFavorite: boolean;
	isPremium: boolean;
	rating: number;
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

type ServerComment = {
	id: string;
	date: string;
	user: {
		name: string;
		avatarUrl: string;
		isPro: boolean;
	};
	comment: string,
	rating: Rating;
}

type ServerCommentWithOfferId = ServerComment & {offerId: string};

export type {
	ServerOffer,
	ServerFullOffer,
	ServerLocation,
	ServerComment,
	ServerCommentWithOfferId,
	CityName,
	OfferType,
	Rating,
};
