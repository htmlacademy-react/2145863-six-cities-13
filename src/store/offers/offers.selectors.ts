import { NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { ServerOffer } from '../../types/offer';
import { State } from '../../types/state';

export const getCity = (state: State): string => state[NameSpace.Offers].city;
export const getSort = (state: State): string => state[NameSpace.Offers].sort;
export const getActiveOffer = (state: State): string | null => state[NameSpace.Offers].activeOffer;
export const getAllOffers = (state: State): ServerOffer[] => state[NameSpace.Offers].allOffers;
export const getAllOffersFetchingStatus = (state: State): RequestStatus => state[NameSpace.Offers].allOffersFetchingStatus;
export const getOfferList = (state: State): ServerOffer[] => state[NameSpace.Offers].offerList;
