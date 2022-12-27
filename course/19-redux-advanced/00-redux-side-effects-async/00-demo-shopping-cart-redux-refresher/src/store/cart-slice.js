//% here we create the slice for the cart

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    // totalAmount: 0, //this can be omitted because we are not really using it,
    // but it would have to be inserted in the situation in which you need the total amount to be paid
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      // check if item already exists
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
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
      // remove the item if the current quantity, before updating, is 1
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

//% EXPORT ACTIONS
export const cartActions = cartSlice.actions;

//% EXPORT SLICE
export default cartSlice;
