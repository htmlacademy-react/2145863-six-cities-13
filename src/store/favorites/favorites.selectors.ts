import { NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { ServerOffer } from '../../types/offer';
import { State } from '../../types/state';

export const getFavorites = (state: Pick<State, NameSpace.Favorites>): ServerOffer[] =>
	state[NameSpace.Favorites].favorites;
export const getFavoritesFetchingStatus = (state: Pick<State, NameSpace.Favorites>): RequestStatus =>
	state[NameSpace.Favorites].favoritesFetchingStatus;
export const getFavoriteAmount = (state: Pick<State, NameSpace.Favorites>): number =>
	state[NameSpace.Favorites].favoriteAmount;
