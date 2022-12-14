//% here we create the slice for the cart

import { createSlice } from "@reduxjs/toolkit";

//% create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    // totalAmount: 0, //this can be omitted because we are not really using it,
    // but it would have to be inserted in the situation in which you need the total amount to be paid
    changed: false,
  },
  reducers: {
    //NB remember that every method in the reducers object receives (automatically, under the hood) an action creator, which is called by using the reducer function name
    addItemToCart(state, action) {
      //% VERY IMPORTANT: NEVER HAVE A SIDE EFFECT (e.g. HTTP REQUEST) INSIDE OF A REDUCER! THEY MUST BE SYNCHRONOUS AND SIDE-EFFECT FREE!!
      const newItem = action.payload;
      // check if item already exists
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        // if item is not present, add new item to the array (NB we can use push here
        // because we are using redux toolkit which under the hood does not really mutate the current state, but creates a copy)
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        // if item is present, update the existing quantity
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      // remove the item if the current quantity, before updating, is 1
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
  },
});

//% EXPORT ACTIONS (always) (NB these are the automatically generated actions -- our custom actions are in cart-actions.js)
export const cartActions = cartSlice.actions;

//% EXPORT SLICE (always)
export default cartSlice;
