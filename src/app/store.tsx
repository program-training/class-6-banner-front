import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './dataSlice'
// import flagReducer from './flagSlice'
// import cartReducer from './cartSlice'
// import filterReducer from './filterSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    // flag: flagReducer,
    // cart: cartReducer,
    // filter: filterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

