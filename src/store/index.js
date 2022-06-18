import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import loginReducer from './loginSlice';
import logoutReducer from './logoutSlice';
import sizeReducer from './sizeSlice';
import searchReducer from './searchSlice';
import selectReducer from './selectSlice';
import categoryReducer from './categorySlice';
import addressOrderReducer from './addressOrderSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
    product: productReducer,
    login: loginReducer,
    logout: logoutReducer,
    size: sizeReducer,
    search: searchReducer,
    select: selectReducer,
    category: categoryReducer,
    addressOrder: addressOrderReducer,
  },
});

export default store;
