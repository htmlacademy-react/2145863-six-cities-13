import CSS from './login-page.module.css';

import Header from '../../components/header/header';
import { ULink } from '../../components/u-link/u-link';
import { useAppDispatch, useAppSelector, useDocumentTitle } from '../../hooks';
import { FormEvent, useEffect, useState } from 'react';
import { loginAction } from '../../store/api-actions';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../../constants/validation';
import { LoginData } from '../../types/user';
import { RequestStatus } from '../../constants/common';
import { userActions } from '../../store/user/user.slice';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { getLoginSendingStatus } from '../../store/user/user.selectors';


function LoginPage(): React.JSX.Element {

	const dispatch = useAppDispatch();
	const sendingStatus = useAppSelector(getLoginSendingStatus);
	const [email, setEmail] = useState('');
	const [isEmailTouched, setIsEmailTouched] = useState(false);
	const [password, setPassword] = useState('');
	const [isPasswordTouched, setIsPasswordTouched] = useState(false);

	const isEmailValid = EMAIL_PATTERN.test(email);
	const isPasswordValid = PASSWORD_PATTERN.test(password);
	const isValid = isEmailValid && isPasswordValid;

	if (sendingStatus === RequestStatus.Error) {
		toast.warning('Failed to submit form. Please try again!');
	}

	useEffect(
		() => () => {
			dispatch(userActions.dropLoginSendingStatus());
		}
	);

	function handleFormSubmit(evt: FormEvent<HTMLFormElement>): void {
		evt.preventDefault();
		if (!isValid) {
			return;
		}

		const form = evt.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData) as LoginData;

		dispatch(loginAction(data));
	}

	useDocumentTitle('Login');

	return (
		<div className="page page--gray page--login">
			<Header hideNavigation/>

			<main className="page__main page__main--login">
				<div className="page__login-container container">
					<section className="login">
						<h1 className="login__title">Sign in</h1>
						<form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
							<div className="login__input-wrapper form__input-wrapper">
								<label className="visually-hidden">E-mail</label>
								<input
									className={clsx('login__input', 'form__input', {[CSS.fieldInvalid]: !isEmailValid && isEmailTouched})}
									type="email"
									name="email"
									placeholder="Email"
									required
									onChange={(e) => setEmail(e.target.value)}
									onBlur={() => {
										setIsEmailTouched(true);
									}}
									value={email}
								/>
								<p
									hidden={isEmailValid || !isEmailTouched}
									className={CSS['error-text']}
								>
										Введите валидный e-mail
								</p>
							</div>
							<div className="login__input-wrapper form__input-wrapper">
								<label className="visually-hidden">Password</label>
								<input
									// className="login__input form__input"
									className={clsx('login__input', 'form__input', {[CSS.fieldInvalid]: !isPasswordValid && isPasswordTouched})}
									type="password"
									name="password"
									placeholder="Password"
									title="Пароль должен содержать не менее одной буквы и цифры"
									required
									onChange={(e) => setPassword(e.target.value)}
									onBlur={() => setIsPasswordTouched(true)}
								/>
								<p
									hidden={isPasswordValid || !isPasswordTouched}
									className={CSS['error-text']}
								>
										Введите не менее одной буквы и цифры
								</p>
							</div>
							<button className="login__submit form__submit button" type="submit" disabled={sendingStatus === RequestStatus.Pending}>
								Sign in
							</button>
						</form>
					</section>
					<section className="locations locations--login locations--current">
						<div className="locations__item">
							<ULink className="locations__item-link">
								<span>Amsterdam</span>
							</ULink>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

export default LoginPage;
