import { describe } from 'vitest';
import { AuthorizationStatus } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { userActions, userReducer } from './user.slice';

const mockUser = {
	name: 'Oliver Conner',
	avatarUrl: 'https://url-to-image/image.png',
	isPro: false,
	email: 'Oliver.conner@gmail.com',
	token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
};

describe ('User slice (reducer)', () => {
	const emptyAction = {type: ''};

	it('Should return initial state with empty action', () => {
		const expectedState = {
			authorizationStatus: AuthorizationStatus.Auth,
			loginSendingStatus: RequestStatus.Error,
			user: mockUser,
		};

		const result = userReducer(expectedState, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should return default initial state with empty action and undefined state', () => {
		const expectedState = {
			authorizationStatus: AuthorizationStatus.Unknown,
			loginSendingStatus: RequestStatus.Idle,
			user: null,
		};

		const result = userReducer(undefined, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should drop sending status to Idle with "dropLoginSendingStatus" action', () => {
		const initialState = {
			authorizationStatus: AuthorizationStatus.Auth,
			loginSendingStatus: RequestStatus.Error,
			user: mockUser,
		};
		const expectedLoginSendingStatus = RequestStatus.Idle;

		const result = userReducer(initialState, userActions.dropLoginSendingStatus);

		expect(result.loginSendingStatus).toBe(expectedLoginSendingStatus);
	});
});
