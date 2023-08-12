import type {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { processErrorHandle } from './process-error-handle';
import { getToken } from './token';

type DetailMessageType = {
	type: string;
	message: string;
}

const BACKEND_URL = 'https://13.design.pages.academy';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
	[StatusCodes.BAD_REQUEST]: true,
	[StatusCodes.UNAUTHORIZED]: true,
	[StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse): boolean => {
	return !!StatusCodeMapping[response.status];
}

const createAPI = (): AxiosInstance => {
	const api = axios.create({
		baseURL: BACKEND_URL,
		timeout: REQUEST_TIMEOUT,
	});

	api.interceptors.request.use(
		// здесь какая-то неочевидная проблема с типизацией
		(config: AxiosRequestConfig) => {
			const token = getToken();

			if (token && config.headers) {
				config.headers['x-token'] = token;
			}

			return config;
		},
	);

	api.interceptors.response.use(
		(response) => response,
		(error: AxiosError<DetailMessageType>) => {
			if (error.response && shouldDisplayError(error.response)) {
				const detailMessage = (error.response.data);
				processErrorHandle(detailMessage.message);
			}

			throw error;
		}
	);

	return api;
};

export {createAPI};
