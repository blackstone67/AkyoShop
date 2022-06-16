import { createSlice } from '@reduxjs/toolkit';

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
    fullName: '',
    email: '',
    password: '',
    errorFullName: false,
    errorEmail: false,
    errorPassword: false,
    errorEmptyFullName: false,
    errorEmptyEmail: false,
    errorEmptyPassword: false,
  },
  reducers: {
    fullNameChanged(state, action) {
      state.fullName = action.payload;
      state.errorFullName = false;
      state.errorEmptyFullName = false;
    },
    emailChanged(state, action) {
      state.email = action.payload;
      state.errorEmail = false;
      state.errorEmptyEmail = false;
    },
    passwordChanged(state, action) {
      state.password = action.payload;
      state.errorPassword = false;
      state.errorEmptyPassword = false;
    },
    setErrorFullName(state) {
      state.errorFullName = true;
    },
    setErrorEmail(state) {
      state.errorEmail = true;
    },
    setErrorPassword(state) {
      state.errorPassword = true;
    },
    setErrorEmptyFullName(state) {
      state.errorEmptyFullName = true;
    },
    setErrorEmptyPassword(state) {
      state.errorEmptyPassword = true;
    },
    setErrorEmptyEmail(state) {
      state.errorEmptyEmail = true;
    },
    clearLogout(state) {
      state.fullName = '';
      state.email = '';
      state.password = '';
      state.errorFullName = false;
      state.errorEmail = false;
      state.errorPassword = false;
      state.errorEmptyFullName = false;
      state.errorEmptyEmail = false;
      state.errorEmptyPassword = false;
    },
  },
});

export const actionsLogout = logoutSlice.actions;
export default logoutSlice.reducer;
