import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {State, AppDispatch} from '../types/state';
import { useMemo } from 'react';
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';

export { useDocumentTitle } from './use-document-title/use-document-title';
export { useMap } from './use-map/use-map';
export { useCities } from './use-cities/use-cities';
export { useOffers } from './use-offers/use-offers';

/** обертка не даст вызвать action которого нет у reducer, а так же для работы с асинхронными действиями */
export const useAppDispatch = useDispatch<AppDispatch>;

/** обертка отображает состав state в IntelliSense при написании селекторов */
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

/** привязывает диспатчи напрямую к экшенам (позволяет не писать dispatch)) */
export function useActionCreators<Actions extends ActionCreatorsMapObject>(actions: Actions) {
	const dispatch = useDispatch();
	return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
}

