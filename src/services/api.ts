import type {AxiosError, AxiosInstance} from 'axios';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';

import 'react-toastify/dist/ReactToastify.css';
import { AppRoute } from '../constants';
import browserHistory from '../browser-history';

const BACKEND_URL = 'https://13.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

const createAPI = (): AxiosInstance => {
	const api = axios.create({
		baseURL: BACKEND_URL,
		timeout: REQUEST_TIMEOUT,
	});

	api.interceptors.request.use((config) => {
		const token = getToken();

		if (token && config.headers) {
			config.headers['x-token'] = token;
		}

		return config;
	});

	api.interceptors.response.use(
		(response) => response,
		(error: AxiosError<{error: string}>) => {
			if (error.response?.status === StatusCodes.NOT_FOUND && error.config?.method === 'get') {
				browserHistory.push(AppRoute.NotFound);
			}

			throw error;
		}
	);

	return api;
};

export {createAPI};
