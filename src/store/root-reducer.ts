import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants';
import { offersReducer } from './offers/offers.slice';
import { userReducer } from './user/user.slice';
// import { dataReducer } from './data/data.slice';
import { offerReducer } from './offer/offer.slice';
import { favoritesReducer } from './favorites/favorites.slice';

export const rootReducer = combineReducers({
	[NameSpace.Offers]: offersReducer,
	[NameSpace.Offer]: offerReducer,
	[NameSpace.Favorites]: favoritesReducer,
	[NameSpace.User]: userReducer,
	// [NameSpace.Data]: dataReducer,
});
