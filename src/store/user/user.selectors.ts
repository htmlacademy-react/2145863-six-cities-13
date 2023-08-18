import { AuthorizationStatus, NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { State } from '../../types/state';
import { User } from '../../types/user';

export const getUser = (state: State): User => state[NameSpace.User].user;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getLoginSendingStatus = (state: State): RequestStatus => state[NameSpace.User].loginSendingStatus;
