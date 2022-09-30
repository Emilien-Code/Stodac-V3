import { createSlice } from "@reduxjs/toolkit";
import eventBus from "../../utils/eventBus";

export const modalSlice = createSlice({
  name: "modals",
  initialState: {
    cart: false,
    menu: false,
    menuFilter: false,
    search: false,
    cookies: false,
    teamMember: {
      name: "Jean-Louis",
      open: false,
    },
  },
  reducers: {
    setModal: (state, action) => {
      switch (action.payload) {
        case "cart":
          state.cart = !state.cart;
          if (state.cart === true) {
            eventBus.dispatch("scrollStop");
          } else (
            eventBus.dispatch("scrollStart")
          )
          break;
        case "menu":
          state.menu = !state.menu;
          if (state.menu === true) {
            eventBus.dispatch("scrollStop");
          } else (
            eventBus.dispatch("scrollStart")
          )
          break;
        case "menuFilter":
          state.menuFilter = !state.menuFilter;
          if (state.menuFilter === true) {
            eventBus.dispatch("scrollStop");
          } else (
            eventBus.dispatch("scrollStart")
          )
          break;
        case "search":
          state.search = !state.search;
          if (state.search === true) {
            eventBus.dispatch("scrollStop");
          } else (
            eventBus.dispatch("scrollStart")
          )
          break;
        case "cookies":
          state.cookies = !state.cookies;
          break;
        default:
          break;
      }
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      if (action.payload === true) {
        eventBus.dispatch("scrollStop");
      } else (
        eventBus.dispatch("scrollStart")
      )
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
      if (action.payload === true) {
        eventBus.dispatch("scrollStop");
      } else (
        eventBus.dispatch("scrollStart")
      )
    },
    setMenuFilter: (state, action) => {
      state.menuFilter = action.payload;
      if (action.payload === true) {
        eventBus.dispatch("scrollStop");
      } else (
        eventBus.dispatch("scrollStart")
      )
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      if (action.payload === true) {
        eventBus.dispatch("scrollStop");
      } else (
        eventBus.dispatch("scrollStart")
      )
    },
    setCookies: (state, action) => {
      state.cookies = action.payload;
      if (action.payload === true) {
        eventBus.dispatch("scrollStop");
      } else (
        eventBus.dispatch("scrollStart")
      )
    },
    setTeamMember: (state, action) => {
      state.teamMember = action.payload;
      if (action.payload.open === true) {
        eventBus.dispatch("scrollStop");
      } else (
        eventBus.dispatch("scrollStart")
      )
    },
  },
});

export const {
  setModal,
  setCart,
  setMenu,
  setMenuFilter,
  setSearch,
  setCookies,
  setTeamMember,
} = modalSlice.actions;

export default modalSlice.reducer;
