import { createStore } from "redux";

//NB CREATE REDUCER FUNCTION
const counterReducer = (currentState = { counter: 0, amount: 1 }, action) => {
  if (action.type === "increment")
    return { counter: currentState.counter + currentState.amount };
  if (action.type === "decrement")
    return { counter: currentState.counter - currentState.amount };
  return currentState;
};

//NB CREATE STORE
const store = createStore(counterReducer);

export default store;
