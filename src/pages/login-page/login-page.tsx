import Header from '../../components/header/header';
import { ULink } from '../../components/u-link/u-link';
import { useActionCreators, useDocumentTitle } from '../../hooks';
import { useEffect, useRef } from 'react';
import { CITIES } from '../../constants/common';
import { userActions } from '../../store/user/user.slice';
import { getRandomInteger } from '../../utils/common';
import { AppRoute } from '../../constants';
import LoginForm from '../../components/login-form/login-form';

function LoginPage(): React.JSX.Element {
	const {dropLoginSendingStatus} = useActionCreators(userActions);
	const cities = Array.from(CITIES);
	const randomCity = useRef(cities[getRandomInteger(cities.length)]);

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
						<div className="locations__item">
							<ULink className="locations__item-link" href={`${AppRoute.Main}?filter=${randomCity.current}`}>
								<span>{randomCity.current}</span>
							</ULink>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

export default LoginPage;
