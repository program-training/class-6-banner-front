import { configureStore } from '@reduxjs/toolkit';
import bannersReducer from './bannersSlice';

export const store = configureStore({
  reducer: {
    banners: bannersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

