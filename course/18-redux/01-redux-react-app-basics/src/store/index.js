import { createStore } from "redux";

const initialState = { counter: 0, amount: 1, showCounter: true };

//NB CREATE REDUCER FUNCTION
const counterReducer = (currentState = initialState, action) => {
  if (action.type === "increment")
    return {
      counter: currentState.counter + currentState.amount,
      amount: currentState.amount,
      showCounter: currentState.showCounter,
    };

  if (action.type === "decrement")
    return {
      counter: currentState.counter - currentState.amount,
      amount: currentState.amount,
      showCounter: currentState.showCounter,
    };

  if (action.type === "toggle")
    return {
      counter: currentState.counter,
      amount: currentState.amount,
      showCounter: !currentState.showCounter,
    };

  return currentState;
};

//NB CREATE STORE
const store = createStore(counterReducer);

export default store;
