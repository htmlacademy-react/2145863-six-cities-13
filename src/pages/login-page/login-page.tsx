import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import RandomCity from '../../components/random-city/random-city';
import { useActionCreators, useDocumentTitle } from '../../hooks';
import { useUnmount } from '../../hooks/use-unmount/useUnmount';
import { userActions } from '../../store/user/user.slice';

function LoginPage(): React.JSX.Element {
	const {dropLoginSendingStatus} = useActionCreators(userActions);
	useDocumentTitle('Login');
	useUnmount(dropLoginSendingStatus);

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
