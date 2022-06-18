import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
    errorEmail: false,
    errorPassword: false,
    errorEmptyEmail: false,
    errorEmptyPassword: false,
    errorLogin: false,
    isUserLogin: false,
    userName: '',
  },
  reducers: {
    emailChanged(state, action) {
      state.email = action.payload;
      state.errorEmail = false;
      state.errorEmptyEmail = false;
      state.errorLogin = false;
    },
    passwordChanged(state, action) {
      state.password = action.payload;
      state.errorPassword = false;
      state.errorEmptyPassword = false;
      state.errorLogin = false;
    },
    setErrorEmail(state) {
      state.errorEmail = true;
    },
    setErrorPassword(state) {
      state.errorPassword = true;
    },
    setErrorEmptyPassword(state) {
      state.errorEmptyPassword = true;
    },
    setErrorEmptyEmail(state) {
      state.errorEmptyEmail = true;
    },
    setErrorLogin(state) {
      state.errorLogin = true;
    },
    clearLogin(state) {
      state.email = '';
      state.password = '';
      state.errorEmail = false;
      state.errorPassword = false;
      state.errorEmptyEmail = false;
      state.errorEmptyPassword = false;
    },
    setIsUserLogin(state) {
      state.isUserLogin = true;
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
  },
});

export const actionsLogin = loginSlice.actions;
export default loginSlice.reducer;
