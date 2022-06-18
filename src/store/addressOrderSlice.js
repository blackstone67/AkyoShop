import { createSlice } from '@reduxjs/toolkit';

const addressOrderSlice = createSlice({
  name: 'addressOrder',
  initialState: {
    name: '',
    errorName: false,
    number: '',
    errorNumber: false,
    email: '',
    errorEmail: false,
    address: '',
    city: '',
  },
  reducers: {
    nameChanged(state, action) {
      state.name = action.payload;
      state.errorName = false;
    },
    numberChanged(state, action) {
      state.number = action.payload;
      state.errorNumber = false;
    },
    emailChanged(state, action) {
      state.email = action.payload;
      state.errorEmail = false;
    },
    addressChanged(state, action) {
      state.address = action.payload;
    },
    cityChanged(state, action) {
      state.city = action.payload;
    },
    setErrorName(state) {
      state.errorName = true;
    },
    setErrorNumber(state) {
      state.errorNumber = true;
    },
    setErrorEmail(state) {
      state.errorEmail = true;
    },
    setEmailLogin(state, action) {
      console.log(action.payload);
      state.email = action.payload;
    },
    clearAddressOrder(state) {
      state.errorName = false;
      state.errorNumber = false;
      state.errorEmail = false;
      state.email = '';
      state.number = '';
      state.name = '';
      state.address = '';
      state.city = '';
    },
  },
});

export const addressOrderActions = addressOrderSlice.actions;

export default addressOrderSlice.reducer;
