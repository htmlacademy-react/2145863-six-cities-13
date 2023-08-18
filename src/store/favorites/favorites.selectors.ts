import { NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { ServerOffer } from '../../types/offer';
import { State } from '../../types/state';

export const getFavorites = (state: State): ServerOffer[] => state[NameSpace.Favorites].favorites;
export const getFavoritesFetchingStatus = (state: State): RequestStatus => state[NameSpace.Favorites].favoritesFetchingStatus;
export const getFavoriteAmount = (state: State): number => state[NameSpace.Favorites].favoriteAmount;
