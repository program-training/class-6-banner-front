import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../component/interface/interface';

const store = import.meta.env.VITE_STORE_SERVER;

export const fetchProduct = createAsyncThunk('product/fetchProduct', async () => {
  const response = await axios.get(`${store}/products`);
  return response.data;
});


interface ProductSlice{
    products:Product[]
    status:string
    error:string
}

const initialState:ProductSlice = {
  products: [],
  status: '',
  error: '',
};

const productSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error)
        state.error = action.error.message as string;
      });
  },
});


export default productSlice.reducer;