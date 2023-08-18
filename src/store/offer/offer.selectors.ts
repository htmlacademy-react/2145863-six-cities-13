import { NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { ServerFullOffer, ServerOffer, ServerReview } from '../../types/offer';
import { State } from '../../types/state';

export const getOffer = (state: State): ServerFullOffer | null => state[NameSpace.Offer].offer;
export const getOfferFetchingStatus = (state: State): RequestStatus => state[NameSpace.Offer].offerFetchingStatus;
export const getNeighborPlaces = (state: State): ServerOffer[] => state[NameSpace.Offer].neighborPlaces;
export const getReviews = (state: State): ServerReview[] => state[NameSpace.Offer].reviews;
export const getReviewsFetchingStatus = (state: State): RequestStatus => state[NameSpace.Offer].reviewsFetchingStatus;
export const getReviewSendingStatus = (state: State): RequestStatus => state[NameSpace.Offer].reviewSendingStatus;
