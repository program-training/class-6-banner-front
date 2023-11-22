import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../component/interface';

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

interface FetchCartDataPayload {
  name: string;
}

export const fetchProductData = createAsyncThunk(
  'data/fetchProductData',
  async (payload: FetchCartDataPayload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8200/api/products/api/inventory`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // setProducts: (state, action: PayloadAction<Product[]>) => {
    //   state.products = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductData.fulfilled, (state, action) => {
      state.products = action.payload[0];
     
    });
      
}});
    


// export const {  fetchProductData} = productsSlice.actions;
export default productsSlice.reducer;