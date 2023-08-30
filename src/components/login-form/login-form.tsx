import CSS from './login-form.module.css';
import clsx from 'clsx';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../../constants/validation';
import { loginAction } from '../../store/api-actions';
import { LoginData } from '../../types/user';
import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getLoginSendingStatus } from '../../store/user/user.selectors';
import { toast } from 'react-toastify';
import { RequestStatus } from '../../constants/common';

function LoginForm(): React.JSX.Element {
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

	function handleSubmit(evt: FormEvent<HTMLFormElement>): void {
		evt.preventDefault();
		if (!isValid) {
			return;
		}

		const form = evt.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData) as LoginData;

		dispatch(loginAction(data));
	}

	return (
		<form
			className="login__form form"
			action="#"
			method="post"
			onSubmit={handleSubmit}
		>
			<div className="login__input-wrapper form__input-wrapper">
				<label className="visually-hidden">E-mail</label>
				<input
					className={clsx('login__input', 'form__input', {
						[CSS.fieldInvalid]: !isEmailValid && isEmailTouched,
					})}
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
					className={clsx('login__input', 'form__input', {
						[CSS.fieldInvalid]: !isPasswordValid && isPasswordTouched,
					})}
					type="password"
					name="password"
					placeholder="Password"
					title="Пароль должен содержать не менее одной буквы и цифры"
					value={password}
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
			<button
				className="login__submit form__submit button"
				type="submit"
				disabled={sendingStatus === RequestStatus.Pending}
			>
				Sign in
			</button>
		</form>
	);
}

export default LoginForm;
