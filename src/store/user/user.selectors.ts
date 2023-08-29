import { AuthorizationStatus, NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { State } from '../../types/state';
import { User } from '../../types/user';

export const getUser = (state: Pick<State, NameSpace.User>): User =>
	state[NameSpace.User].user;
export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus =>
	state[NameSpace.User].authorizationStatus;
export const getLoginSendingStatus = (state: Pick<State, NameSpace.User>): RequestStatus =>
	state[NameSpace.User].loginSendingStatus;
