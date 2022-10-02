import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: "modals",
  initialState: {
    cart: false,
    menu: false,
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const {
  setCart,
  setMenu,
} = modalSlice.actions;

export default modalSlice.reducer;
