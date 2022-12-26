import { createSlice } from "@reduxjs/toolkit";

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

//% 3) EXPORTING ACTIONS IN ORDER TO ACCESS THEM
export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
