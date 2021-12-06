import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import ClassesReducer from './classes';
import ClassReducer from './class';

const RootStore = configureStore({
	reducer: {
		classes: ClassesReducer,
		currentClass: ClassReducer
	},
	devTools: process.env.NODE_ENV === 'development'
});

const makeStore = () => RootStore;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof RootStore.dispatch;

export const wrapper = createWrapper<AppStore>(makeStore);
