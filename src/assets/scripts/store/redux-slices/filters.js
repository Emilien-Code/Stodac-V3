import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: "filters",
  initialState: {
    searched: "",
    manufactor: "",
    category: ""
  },
  reducers: {
    setSearched: (state, action) => {
      state.searched = action.payload;
    },
    setManufacter: (state, action) => {
      state.manufactor = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const {
  setSearched,
  setManufacter,
  setCategory
} = modalSlice.actions;

export default modalSlice.reducer;
