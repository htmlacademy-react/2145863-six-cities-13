import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-route/history-route';
import React from 'react';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from './mocks';
import { Provider } from 'react-redux';

/**
 * HOC для тестирования компонентов подлюченных к React Router
 */
export function withHistory(component: React.JSX.Element, history?: MemoryHistory) {
	const memoryHistory = history ?? createMemoryHistory();

	return (
		<HistoryRouter history={memoryHistory}>
			{component}
		</HistoryRouter>
	);
}

type ComponentWithMockStore = {
	withStoreComponent: React.JSX.Element;
	mockStore: MockStore;
	mockAxiosAdapter: MockAdapter;
};

/**
 * HOC для тестирования компонентов подлюченных к Redux
 * */
export function withStore(
	component: React.JSX.Element,
	initialState: Partial<State> = {},
): ComponentWithMockStore {

	const axios = createAPI();
	const mockAxiosAdapter = new MockAdapter(axios);
	const middleware = [thunk.withExtraArgument(axios)];
	const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
	const mockStore = mockStoreCreator(initialState);

	return ({
		withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
		mockStore,
		mockAxiosAdapter,
	});
}

