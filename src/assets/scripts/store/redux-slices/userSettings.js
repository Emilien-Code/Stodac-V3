
import { createSlice } from "@reduxjs/toolkit";

export const userSettingsSlice = createSlice({
  name: "settings",
  initialState: {
    hasAcceptedCookies: false,
  },
  reducers: {
    setCookies: (state, action) => {
      state.hasAcceptedCookies = action.payload;
    },
  },
});

export const { setCookies } = userSettingsSlice.actions;

export default userSettingsSlice.reducer;
