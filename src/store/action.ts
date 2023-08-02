import { createAction } from '@reduxjs/toolkit';

export const fillOfferList = createAction('main/fillOfferList');
export const setCity = createAction<string>('main/setCity');
export const setSort = createAction<string>('main/setSort');
export const setActiveCard = createAction<string>('main/setActiveCard');
