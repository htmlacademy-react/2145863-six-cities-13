/**
 * Обертки для работы с токеном и Local storage.
 * Помимо лаконичности кода, обертки помогут в дальнейшем при тестировании подменить Local Storage
 * другим объектом, т.к. в NodeJS Local Storage будет недоступен.
 * Так же это упростит переход на другое хранилище, если это потребуется.
 */

export type Token = string;

const AUTH_TOKEN_KEY_NAME = 'six-sities-token';

function getToken(): Token {
	const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
	return token ?? '';
}

function saveToken(token: Token) {
	localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
}

function dropToken() {
	localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
}

export {getToken, saveToken, dropToken};
