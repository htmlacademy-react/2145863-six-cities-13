import { describe } from 'vitest';
import { AuthorizationStatus } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { userActions, userReducer } from './user.slice';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

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

	it('Should drop sendingStatus to Idle with "dropLoginSendingStatus" action', () => {
		const initialState = {
			authorizationStatus: AuthorizationStatus.Auth,
			loginSendingStatus: RequestStatus.Error,
			user: mockUser,
		};
		const expectedLoginSendingStatus = RequestStatus.Idle;

		const result = userReducer(initialState, userActions.dropLoginSendingStatus);

		expect(result.loginSendingStatus).toBe(expectedLoginSendingStatus);
	});

	it('should set "user" to null and  "authorizationStatus" to Unknown with "checkAuthAction.pending" action', () => {
		const initialState = {
			authorizationStatus: AuthorizationStatus.Auth,
			loginSendingStatus: RequestStatus.Idle,
			user: mockUser,
		};
		const expectedState = {
			authorizationStatus: AuthorizationStatus.Unknown,
			loginSendingStatus: RequestStatus.Idle,
			user: null,
		};

		const result = userReducer(initialState, checkAuthAction.pending);

		expect(result).toEqual(expectedState);
	});

	it('should set "user" and  "authorizationStatus" to Auth with "checkAuthAction.fulfilled" action', () => {
		const initialState = {
			authorizationStatus: AuthorizationStatus.Unknown,
			loginSendingStatus: RequestStatus.Idle,
			user: null,
		};
		const expectedState = {
			authorizationStatus: AuthorizationStatus.Auth,
			loginSendingStatus: RequestStatus.Idle,
			user: mockUser,
		};

		const result = userReducer(initialState, checkAuthAction.fulfilled(mockUser, '', undefined));

		expect(result).toEqual(expectedState);
	});

	it('should set "user" to null and  "authorizationStatus" to NoAuth with "checkAuthAction.rejected" action', () => {
		const initialState = {
			authorizationStatus: AuthorizationStatus.Unknown,
			loginSendingStatus: RequestStatus.Idle,
			user: null,
		};
		const expectedState = {
			authorizationStatus: AuthorizationStatus.NoAuth,
			loginSendingStatus: RequestStatus.Idle,
			user: null,
		};

		const result = userReducer(initialState, checkAuthAction.rejected);

		expect(result).toEqual(expectedState);
	});

	it('should set "loginSendingStatus" to panding  with "loginAction.pending" action', () => {
		const expectedLoginSendingStatus = RequestStatus.Pending;
		const result = userReducer(undefined, loginAction.pending);
		expect(result.loginSendingStatus).toEqual(expectedLoginSendingStatus);
	});

	it('should set "user", "loginSendingStatus" and  "authorizationStatus" to NoAuth with "loginAction.fulfilled" action', () => {
		const expectedState = {
			authorizationStatus: AuthorizationStatus.Auth,
			loginSendingStatus: RequestStatus.Success,
			user: mockUser,
		};

		const result = userReducer(
			undefined,
			loginAction.fulfilled(mockUser, '', {email: 'test@mail.com', password: 'q1' })
		);

		expect(result).toEqual(expectedState);
	});

	it('should set "user" to null, "loginSendingStatus" to Error and  "authorizationStatus" to NoAuth with "loginAction.rejected" action', () => {
		const expectedState = {
			authorizationStatus: AuthorizationStatus.NoAuth,
			loginSendingStatus: RequestStatus.Error,
			user: null,
		};
		const result = userReducer(undefined, loginAction.rejected);
		expect(result).toEqual(expectedState);
	});

	it('should set "user" to null, and  "authorizationStatus" to NoAuth with "logoutAction.fulfilled" action', () => {
		const expectedState = {
			authorizationStatus: AuthorizationStatus.NoAuth,
			loginSendingStatus: RequestStatus.Idle,
			user: null,
		};
		const result = userReducer(undefined, logoutAction.fulfilled);
		expect(result).toEqual(expectedState);
	});

});
