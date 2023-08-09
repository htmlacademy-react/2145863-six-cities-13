/**
 * Обертки для работы с токеном и Local storage.
 * Помимо лаконичности кода, обертки помогут в дальнейшем при тестировании подменить Local Storage
 * другим объектом, т.к. в NodeJS Local Storage будет недоступен.
 * Так же это упростит переход на другое хранилище если потребуется.
 */

export type Token = string;

const AUTH_TOKEN_KEY_NAME = 'six-sities-token';

const getToken = (): Token => {
	const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
	return token ?? '';
}

const saveToken = (token: Token): void => {
	localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
}

const dropToken = (): void => {
	localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
}

export {getToken, saveToken, dropToken};
