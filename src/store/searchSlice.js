import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchQuery: '',
  },
  reducers: {
    valueSearchChanged(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const actionsSearch = searchSlice.actions;
export default searchSlice.reducer;
