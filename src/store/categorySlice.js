import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    valueCategory: '',
  },
  reducers: {
    categoryChanged(state, action) {
      state.valueCategory = action.payload;
    },
    
  },
});

export const actionsCategory = categorySlice.actions;
export default categorySlice.reducer;
