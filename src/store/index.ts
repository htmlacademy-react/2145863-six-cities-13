import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';

export const store = configureStore({reducer});

// далее story ипортируем в точку вохода в приложение в index.tsx
// import {store} from './store';

// так же необходимо подключить react-redux для интеграции с React приложением (HOC Provider)
// import {Provider} from 'react-redux';
// Оборачиваем <App> в HOC <Provider store={store}>

// <Provider store={store}>
//   <App />
// </Provider>

// Теперь можно использовать Hooks

// так же опишием типы создав state.ts в дирректории types это необязательно, но с данным описанием типов работать удобнее
// import { store } from '../store/index.ts';
//   строчка ниже позволяет обновлять описание типа state автоматически по мене внесения изменений
//   в InitialState
// export type State = ReturnType<typeof store.getState>;
//  AddDispatch понадобится для последующей работы с Хуками
// export type AppDispatch = typeof store.dispatch;

// *** Заводим Hook useDispatch
// import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
// import type {State, AppDispatch} from '../types/state';
//   заготовки для кастомных хуков (кастомно типизированные) для работы с хранилищем
// export const useDispatch = () => useDispatch<AppDispatch>();
//   !!! внутри сложная типизация позволяющая при создании кастомных хуков внитри них видеть конкретные поля нашего стейта
//   что облегчает работу со стейтом. Т.к. теперь кастомные хуки знают структуру глобального хранилища.
//   это будет особенно важно при росте размера стейта
// export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

// *** теперь можно подключать useAppDispatch в наших компонентах он будет типизирован
// const dispatch = useAppDispatch();
// ...
// * далее диспатчим экшены
// пример: при нажатии на кнопку Play (переинициализируем глобальный стайт и перейдем на страницу игры)
// onClick = {() => {
// 	dispatch(resetGame());
// 	navigate(AppRoute.Game);
// }}
// * и извлекаем состояния
//  змменим извлечение из локального стейта [step, setStep] = useState на извлечение данных из store
// step = useAppSelector((state) => state.step);
// записываем данные при выборе
// onAnswer={() => dispatch(incrementStep)};
