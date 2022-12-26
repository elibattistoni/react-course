import { createStore } from "redux";

const initialState = { counter: 0, amount: 1, showCounter: true };

//% CREATE REDUCER FUNCTION
const counterReducer = (currentState = initialState, action) => {
  //§ WORKING CORRECTLY WITH REDUX STATE
  //NB the objects that we return in the reducer willNOT be merged with the existing state: they overwrite the existing state!
  //NB so when we update a single piece opf state (i.e. a single property of the state) we must always set also the other pieces of state!
  //NB you MUST overwrite it: it is the best practice and an important rule when using Redux
  //NB IMPORTANT always overwrite it and return a brand new object

  if (action.type === "increment")
    //NB it is extremely IMPORTANT that you never mutate the currentState!
    //NB do not do this: currentState.counter++ and then return currentState
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

//% CREATE STORE
const store = createStore(counterReducer);

export default store;
