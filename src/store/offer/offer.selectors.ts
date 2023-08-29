import { NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { ServerFullOffer, ServerOffer, ServerReview } from '../../types/offer';
import { State } from '../../types/state';

export const getOffer = (state: Pick<State, NameSpace.Offer>): ServerFullOffer | null =>
	state[NameSpace.Offer].offer;
export const getOfferFetchingStatus = (state: Pick<State, NameSpace.Offer>): RequestStatus =>
	state[NameSpace.Offer].offerFetchingStatus;
export const getNeighborPlaces = (state: Pick<State, NameSpace.Offer>): ServerOffer[] =>
	state[NameSpace.Offer].neighborPlaces;
export const getReviews = (state: Pick<State, NameSpace.Offer>): ServerReview[] =>
	state[NameSpace.Offer].reviews;
export const getReviewsFetchingStatus = (state: Pick<State, NameSpace.Offer>): RequestStatus =>
	state[NameSpace.Offer].reviewsFetchingStatus;
export const getReviewSendingStatus = (state: Pick<State, NameSpace.Offer>): RequestStatus =>
	state[NameSpace.Offer].reviewSendingStatus;
