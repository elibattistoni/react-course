import { createStore } from "redux";

//NB CREATE REDUCER FUNCTION
const counterReducer = (currentState = { counter: 0 }, action) => {
  if (action.type === "increment") return { counter: currentState.counter + 1 };
  if (action.type === "decrement") return { counter: currentState.counter - 1 };
  return currentState;
};

//NB CREATE STORE
const store = createStore(counterReducer);

export default store;
