import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {State, AppDispatch} from '../types/state';

export {useDocumentTitle} from './use-document-title/use-document-title';
export { useMap } from './use-map/use-map';

// обертска предотвратит попытку вызвать действие которое не создавалось для редьюсера
export const useAppDispatch = () => useDispatch<AppDispatch>();
// обертка обеспечивает при написании селекторов отображения состава стейта средствами IntelliSense
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
