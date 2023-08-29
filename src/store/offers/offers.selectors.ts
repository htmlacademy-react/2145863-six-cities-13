import { NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { ServerOffer } from '../../types/offer';
import { State } from '../../types/state';

export const getCity = (state: Pick<State, NameSpace.Offers>): string =>
	state[NameSpace.Offers].city;
export const getSort = (state: Pick<State, NameSpace.Offers>): string =>
	state[NameSpace.Offers].sort;
export const getActiveOffer = (state: Pick<State, NameSpace.Offers>): string | null =>
	state[NameSpace.Offers].activeOffer;
export const getAllOffers = (state: Pick<State, NameSpace.Offers>): ServerOffer[] =>
	state[NameSpace.Offers].allOffers;
export const getAllOffersFetchingStatus = (state: Pick<State, NameSpace.Offers>): RequestStatus =>
	state[NameSpace.Offers].allOffersFetchingStatus;
