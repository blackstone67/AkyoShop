import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    productHome: [],
    isLogin: false,
    buyOrder: false,
  },
  reducers: {
    getProduct(state, action) {
      state.productHome = action.payload;
    },
    setIsLogin(state) {
      state.isLogin = true;
    },
    changeOrder(state) {
      state.buyOrder = !state.buyOrder;
    },
  },
});

export const actionsHome = homeSlice.actions;
export default homeSlice.reducer;
