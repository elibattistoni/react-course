import { createSlice, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import counterReducer from "./counter-slice";

/*
//% 1) CREATING THE REDUCER (for the counter)
% refactored this: put into a separate file
const initialCounterState = { counter: 0, showCounter: true };
const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
*/

/*
//% 1) CREATING THE REDUCER (for the authentication)
% refactored this: put into a separate file
const initialAuthState = { isAuthenticated: false };
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});
*/

//NB by separating the slices and dedicating them to a different files,
//- here we can focus on creating the main store and merge all the slice reducers together

//% 2) CREATING THE STORE: even if you have multiple state slices, you create the store (by calling/configuring the store) ONLY ONCE!
const store = configureStore({
  // reducer: { counter: counterSlice.reducer, auth: authSlice.reducer }, // before refactoring
  reducer: { counter: counterReducer, auth: authReducer },
});

/*
% also put these into the relative separated files
//% 3) EXPORTING ACTIONS IN ORDER TO ACCESS THEM
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
*/
export default store;
