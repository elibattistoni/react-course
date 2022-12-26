import { createSlice, configureStore } from "@reduxjs/toolkit";

//% 1) CREATING THE REDUCER (for the counter)
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

//% 2) CREATING THE STORE: even if you have multiple state slices, you create the store (by calling/configuring the store) ONLY ONCE!
const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

//% 3) EXPORTING ACTIONS IN ORDER TO ACCESS THEM
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;
