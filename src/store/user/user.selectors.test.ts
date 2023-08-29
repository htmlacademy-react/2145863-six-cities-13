import { AuthorizationStatus, RequestStatus } from '../../constants/common';
import { NameSpace } from '../../constants';
import { getAuthorizationStatus, getLoginSendingStatus, getUser } from './user.selectors';


describe('Users selectors', () => {

	const mockUser = {
		name: 'Billy Bones',
		avatarUrl: 'http://avatars.com/random.jpg',
		isPro: true,
		email: 'test.billy@bones.mail',
		token: 'test-token',
	};

	const state = {
		[NameSpace.User]: {
			authorizationStatus: AuthorizationStatus.Auth,
			loginSendingStatus: RequestStatus.Pending,
			user: mockUser,
		},
	};

	it('should user favorites from state', () => {
		const {user} = state[NameSpace.User];
		const result = getUser(state);
		expect(result).toEqual(user);
	});

	it('should return authorizationStatus from state', () => {
		const {authorizationStatus} = state[NameSpace.User];
		const result = getAuthorizationStatus(state);
		expect(result).toBe(authorizationStatus);
	});

	it('should return loginSendingStatus from state', () => {
		const {loginSendingStatus} = state[NameSpace.User];
		const result = getLoginSendingStatus(state);
		expect(result).toBe(loginSendingStatus);
	});


});
