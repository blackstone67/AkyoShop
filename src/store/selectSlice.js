import { createSlice } from '@reduxjs/toolkit';

const selectSlice = createSlice({
  name: 'select',
  initialState: {
    valueSelect: '',
  },
  reducers: {
    onChange(state, action) {
      state.valueSelect = action.payload;
    },
    clearSelect(state) {
      state.valueSelect = '';
    },
  },
});

export const ActionsSelect = selectSlice.actions;
export default selectSlice.reducer;
