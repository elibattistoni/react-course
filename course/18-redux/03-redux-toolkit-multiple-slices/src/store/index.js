import { createSlice, configureStore } from "@reduxjs/toolkit";

//% 1) CREATING THE REDUCER
const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState,
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

//% 2) CREATING THE STATE
const store = configureStore({
  reducer: counterSlice.reducer,
});

//% 3) EXPORTING ACTIONS IN ORDER TO ACCESS THEM
export const counterActions = counterSlice.actions;

export default store;
