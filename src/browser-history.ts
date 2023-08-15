/**
 * Пакет history позволяет выполнить перенаправление по какому-либо маршруту не из компонента?
 * Например, из действия. В ReactRouter v.6 нет нет возможности использовать history через кастомный
 * HistoryRoute при использовании нового компонента Router Provider.
 */

import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

export default browserHistory;

