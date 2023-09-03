import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import userEvent from '@testing-library/user-event';
import LoginForm from './login-form';
import { AuthorizationStatus, NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';
import { createFakeStore } from '../../utils/mocks';

describe('Component: LoginForm', () => {

	it('should render correctly', () => {
		const expectedEmailLabel = 'E-mail';
		const expectedPasswordLabel = 'Password';
		const expectedSubmitText = 'Sign in';
		const {withStoreComponent} = withStore(<LoginForm />, createFakeStore());
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);

		expect(screen.getByText(expectedEmailLabel)).toBeInTheDocument();
		expect(screen.getByText(expectedPasswordLabel)).toBeInTheDocument();
		expect(screen.getByText(expectedSubmitText)).toBeInTheDocument();
	});

	it('should render correctly when user enter login and password', async () => {
		const expectedEmailtId = 'emailElement';
		const expectedPasswordId = 'passwordElement';
		const expectedLoginValue = 'test@test.com';
		const expectedPasswordValue = 'qwerty123';
		const {withStoreComponent} = withStore(
			<LoginForm />,
			createFakeStore({[NameSpace.User]: {
				authorizationStatus: AuthorizationStatus.NoAuth,
				loginSendingStatus: RequestStatus.Idle,
				user: null,
			}})
		);
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);
		await userEvent.type(
			screen.getByTestId(expectedEmailtId),
			expectedLoginValue,
		);
		await userEvent.type(
			screen.getByTestId(expectedPasswordId),
			expectedPasswordValue,
		);

		expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
		expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
	});

});
