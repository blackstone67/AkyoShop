import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    openCart: false,
    productCart: [],
    totalAmount: 0,
  },
  reducers: {
    addToCartWithQuantity(state, action) {
      const newProduct = action.payload;
      const ixdExistingCart = state.productCart.findIndex(
        (item) => item.id === newProduct.id
      );
      const existingCart = state.productCart[ixdExistingCart];

      if (ixdExistingCart !== -1) {
        state.productCart[ixdExistingCart] = {
          ...existingCart,
          ...newProduct,
          quality: existingCart.quality + newProduct.quality,
        };
      } else {
        state.productCart.push({
          ...newProduct,
        });
      }

      state.totalAmount += newProduct.price * newProduct.quality;
    },
    addCart(state, action) {
      const newProduct = action.payload;
      const ixdExistingCart = state.productCart.findIndex(
        (item) => item.id === newProduct.id
      );

      if (ixdExistingCart !== -1) {
        state.productCart[ixdExistingCart].quality++;
      } else {
        state.productCart.push({
          ...newProduct,
          quality: 1,
        });
      }
      state.totalAmount += newProduct.price;
    },
    deleteCart(state, action) {
      const idRemoveProduct = state.productCart.findIndex(
        (item) => item.id === action.payload
      );

      state.totalAmount -=
        state.productCart[idRemoveProduct].price *
        state.productCart[idRemoveProduct].quality;

      state.productCart = state.productCart.filter(
        (item) => item.id !== action.payload
      );
    },
    openCart(state) {
      state.openCart = true;
    },
    closeCart(state) {
      state.openCart = false;
    },
    clearCart(state) {
      state.productCart = [];
      state.totalAmount = 0;
    },
  },
});

export const actionsCart = cartSlice.actions;
export default cartSlice.reducer;
