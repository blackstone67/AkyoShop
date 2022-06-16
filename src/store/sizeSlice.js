import { createSlice } from '@reduxjs/toolkit';

const sizeReducer = createSlice({
  name: 'size',
  initialState: {
    value: '',
  },
  reducers: {
    sizeChanged(state, action) {
      state.value = action.payload;
    },
    clearSize(state) {
      state.value = '';
    },
  },
});

export const actionsSize = sizeReducer.actions;
export default sizeReducer.reducer;
