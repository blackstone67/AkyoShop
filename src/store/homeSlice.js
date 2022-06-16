import { createSlice } from '@reduxjs/toolkit';
// import { DATA_PRODUCT } from '../Data/product';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    productHome: [],
    isLogin: false,
  },
  reducers: {
    getProduct(state, action) {
      state.productHome = action.payload;
    },
    setIsLogin(state) {
      state.isLogin = true;
    },
  },
});

export const actionsHome = homeSlice.actions;
export default homeSlice.reducer;
