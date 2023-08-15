import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants';
import { offersReducer } from './offers/offers.slice';
import { interactionsReducer } from './interactions/interactions.slice';
import { userReducer } from './user/user.slice';
import { dataReducer } from './data/data.slice';

export const rootReducer = combineReducers({
	[NameSpace.Offers]: offersReducer,
	[NameSpace.Interactions]: interactionsReducer,
	[NameSpace.User]: userReducer,
	[NameSpace.Data]: dataReducer,
});
