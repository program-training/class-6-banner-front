import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Banner } from '../component/interface/interface';

const api =import.meta.env.VITE_MY_SERVER;

export const fetchBanners = createAsyncThunk('banners/fetchBanners', async () => {
  const response = await axios.get(`${api}/api/banners`);
  return response.data;
});


interface BannerSlice{
    banners:Banner[]
    status:string
    error:string
}

const initialState:BannerSlice = {
  banners: [],
  status: '',
  error: '',
};

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {

    setBanners: (state, action) => {
        state.banners = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error)
        state.error = action.error.message as string;
      });
  },
});


export const { setBanners } = bannersSlice.actions;
export default bannersSlice.reducer;