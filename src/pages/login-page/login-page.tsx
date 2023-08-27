import Header from '../../components/header/header';
import { useActionCreators, useDocumentTitle } from '../../hooks';
import { useEffect } from 'react';
import { userActions } from '../../store/user/user.slice';
import LoginForm from '../../components/login-form/login-form';
import RandomCity from '../../components/random-city/random-city';

function LoginPage(): React.JSX.Element {
	const {dropLoginSendingStatus} = useActionCreators(userActions);

	useEffect(
		() => () => {
			dropLoginSendingStatus();
		}
	);

	useDocumentTitle('Login');

	return (
		<div className="page page--gray page--login">
			<Header hideNavigation/>

			<main className="page__main page__main--login">
				<div className="page__login-container container">
					<section className="login">
						<h1 className="login__title">Sign in</h1>
						<LoginForm />
					</section>
					<section className="locations locations--login locations--current">
						<RandomCity />
					</section>
				</div>
			</main>
		</div>
	);
}

export default LoginPage;
