import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getFullOffer, getNeighborPlaces, getReviews } from '../../model';
import { SortMap, convertOffersToOffersByCity } from '../../utils/convert';
import { DEFAULT_CITY, NameSpace, SortMethod } from '../../constants';
import { ServerFullOffer, ServerOffer, ServerReview } from '../../types/offer';

// const dataOffers = getOfferList();
const reviews = getReviews();

type OffersState = {
	city: string;
	sort: string;
	offer: ServerFullOffer | null;
	allOffers: ServerOffer[];
	offerList: ServerOffer[];
	neighborPlaces: ServerOffer[];
	reviews: ServerReview[];
	favorites: ServerOffer[];
	favoriteAmount: number;
}

const initialState: OffersState = {
	city: DEFAULT_CITY,
	sort: SortMethod.Popular as string,
	offer: null,
	allOffers: [],
	offerList: [],
	neighborPlaces: [],
	reviews: [],
	favorites: [],
	favoriteAmount: 0,
};

const prepareOfferList = (state: OffersState) => {
	const {city, sort} = state;
	return convertOffersToOffersByCity(state.allOffers)[city]?.sort(SortMap[sort].sortFunc) || [];
};

const slice = createSlice({
	name: NameSpace.Offers,
	initialState,
	reducers: {
		fetchOffers(state, action: PayloadAction<ServerOffer[]>) {
			state.allOffers = action.payload || [];
			// переделать избранное на отдельный запрос
			// state.favorites = state.allOffers.filter((offer) => offer.isFavorite);
			// state.favoriteAmount = state.favorites.length;
		},
		loadOffer(state, action: PayloadAction<ServerFullOffer>) {
			// state.offer = getFullOffer(action.payload) ?? null;
			state.offer = action.payload;
		},
		fetchNeighborPlaces(state, action: PayloadAction<ServerOffer['id']>) {
			state.neighborPlaces = getNeighborPlaces(action.payload);
		},
		fetchReviews(state, action: PayloadAction<ServerOffer['id']>) {
			state.reviews = reviews.filter((review) => review.offerId === action.payload);
		},
		dropOffer(state) {
			state.offer = null;
			state.reviews = [];
			state.neighborPlaces = [];
		},
		fetchFavorites(state) {
			state.favorites = state.allOffers.filter((offer) => offer.isFavorite);
			state.favoriteAmount = state.favorites.length;
		},
		fillOfferList(state) {
			state.offerList = prepareOfferList(state);
		},
		setCity(state, action: PayloadAction<string>) {
			state.city = action.payload;
			state.offerList = prepareOfferList(state);
		},
		setSort(state, action: PayloadAction<string>) {
			state.sort = action.payload;
			state.offerList = prepareOfferList(state);
		},
	}
});

export const {
	reducer: offersReducer,
	actions: offersActions,
} = slice;
