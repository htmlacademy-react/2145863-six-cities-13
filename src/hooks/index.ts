import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {State, AppDispatch} from '../types/state';

export {useDocumentTitle} from './use-document-title/use-document-title';
export { useMap } from './use-map/use-map';

/** обертка не даст вызвать action которого нет у reducer */
export const useAppDispatch = useDispatch<AppDispatch>;
/** обертка отображает состав state в IntelliSense при написании селекторов */
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
