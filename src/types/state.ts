import { store } from '../store';

/** type State динамически обновляется на базе initialState*/
export type State = ReturnType<typeof store.getState>
/** типизация для диспатчинга store */
export type AppDispatch = typeof store.dispatch;
