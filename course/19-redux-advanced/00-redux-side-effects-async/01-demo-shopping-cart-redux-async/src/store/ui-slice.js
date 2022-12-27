//% here we create the slice for the ui (for toggling the visibility of the cart)

import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    // the kind of notification that should be shown, should be encoded in the action as a payload
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

//% EXPORT ACTIONS
export const uiActions = uiSlice.actions;

//% EXPORT SLICE
export default uiSlice;
