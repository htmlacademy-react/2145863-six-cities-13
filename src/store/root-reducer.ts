import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants';
import { offersReducer } from './offers/offers.slice';
import { interactionsReducer } from './interactions/interactions.slice';

export const rootReducer = combineReducers({
	[NameSpace.Offers]: offersReducer,
	[NameSpace.Interactions]: interactionsReducer,
});
