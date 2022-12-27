//% here we create the slice for the ui (for toggling the visibility of the cart)

import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

//% EXPORT ACTIONS
export const uiActions = uiSlice.actions;

//% EXPORT SLICE
export default uiSlice;
