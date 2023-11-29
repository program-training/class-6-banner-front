import { configureStore } from '@reduxjs/toolkit';
import bannersReducer from './bannersSlice';
import productslice from './productslice';

export const store = configureStore({
  reducer: {
    banners: bannersReducer,
    products:productslice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

