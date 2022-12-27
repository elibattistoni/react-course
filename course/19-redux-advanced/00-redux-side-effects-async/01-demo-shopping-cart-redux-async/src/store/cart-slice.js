//% here we create the slice for the cart

import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

//% create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    // totalAmount: 0, //this can be omitted because we are not really using it,
    // but it would have to be inserted in the situation in which you need the total amount to be paid
  },
  reducers: {
    //NB remember that every method in the reducers object receives (automatically, under the hood) an action creator, which is called by using the reducer function name
    addItemToCart(state, action) {
      //% VERY IMPORTANT: NEVER HAVE A SIDE EFFECT (e.g. HTTP REQUEST) INSIDE OF A REDUCER! THEY MUST BE SYNCHRONOUS AND SIDE-EFFECT FREE!!
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

//% CREATE ACTION CREATOR (not always, it is IN ALTERNATIVE TO USING useEffect FOR ASYNC OPERATIONS!)
export const sendCartDataActionCreator = (cart) => {
  //| here we create an action creator that returns another function, and this function should receive the dispatch function as input argument
  //| and inside the returned function we can dispatch the actual action that we want to perform (like showing a notifiction,adding a cart item)
  //IMPORTANT before dispatch, we can perform any async code, any side effect, because we
  /// we are not running this in a reducer, it is a separate, standalone Javascript function

  return async (dispatch) => {
    //NB we can do this because redux-toolkit it does not accept only action objects (like for the automatically created action creators)
    //NB but it also accepts action creators that return functions
    //NB and if it sees that you are dispatching an action that is a function (instead of an object), it will execute that funciton fot you (i.e. the "dispatch" function)
    //NB it will give us the dispatch argument automatically, so that inside the returned function, we can dipatch again
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      //| after dispatchingg the first notification, we can execute this:
      const dbUrl =
        "https://fir-shopping-cart-redux-async-default-rtdb.europe-west1.firebasedatabase.app/cart.json";
      const response = await fetch(dbUrl, {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

//% EXPORT ACTIONS (always)
export const cartActions = cartSlice.actions;

//% EXPORT SLICE (always)
export default cartSlice;
