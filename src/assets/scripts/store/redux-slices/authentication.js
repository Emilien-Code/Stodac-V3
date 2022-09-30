import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    connected: false,
    id: null,
    data: {},
  },
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setData: (state, action) => {
      state.id = action.payload._id;
      state.data = action.payload;
    },
  },
});

export const { setConnected, setData } = authenticationSlice.actions;

export default authenticationSlice.reducer;
