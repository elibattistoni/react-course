//% we use the Redux-Toolkit here, in the Reducer (and indirectly with the actions)
//| we import the createSlice function (there is also a createReducer function but the createSlice function is more powerful)
import { createSlice, configureStore } from "@reduxjs/toolkit";

//% 1) CREATING THE REDUCER
const initialState = { counter: 0, showCounter: true };

//| call createSlice below the initialState object:
//| createSlice takes as input an object
//| with this we are preparing a slice of the global state
//| and when we have different pieces of state which are not directly related (e.g. an authentication status and a counter status)
//| we could create different slices, potentially also in different files to make our code maintainable
const counterSlice = createSlice({
  //| the object needs a name
  name: "counter",
  //| it needs an initial state
  // initialState: initialState,
  initialState,
  //| it needs reducers
  //| and this is an object (a map) of all the reducers this slice needs
  //| 4 methods because in the reducer I have 4 different if cases
  //| every method will automatically receive the latest state
  //| these methods will be automatically called by redux toolkit depending on which action was triggered
  //| so we don't need to write our own if checks anymore, instead we will
  //| identify these different reducers and dispatch actions that target these different reducers
  //| important inside these methods, we are allowed to mutate the state
  reducers: {
    // increase by 1
    increment(state) {
      //NB this was forbidden before, but now with redux-toolkit it SEEMS that we can mutate the current state
      //- instead of having to return a brand new, complete state snapshot
      //NB we are not really mutating the existing state however, because under the hood redux-toolkit uses another library called imgur
      //- which detects code like this and automatically clones the existing state,
      //- creates a new state object, keep all the state (properties of the state) that we are not editing
      //- and override the state that we are editing in an immutable way
      //NB so we still have immutable code here, even if it does not look like it
      state.counter++;
    },

    // decrease by 1
    decrement(state) {
      state.counter--;
    },

    // increase by an amount
    increase(state, action) {
      //NB in the two pervious methods we did not use as input argument the action,
      //NB but we actually have it also for these reducer methods with redux-toolkit
      //NB in the other methods we did not need to specify it in the input arguments because we did not need it
      //NB here, however, we can
      state.counter = state.counter + action.payload;
      //NB payload is the name of the property which will hold any extra data you might be dispatching
    },

    // show/hide counter
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

//% 2) CREATING THE STATE
// keep in mind that in large applications, you will likely have mutliple state slices
// and we can pass only one reducer to createStore
// const store = createStore(counterSlice.reducer); // this works only if you have one slice!!

//| best practice: configureStore (like createStore) creates a store but it makes merging multiple reducers into one reducer easier
const store = configureStore({
  //| reducer is an expected property and if you have a single reducer you could do this:
  // reducer: counterSlice.reducer
  //| however if you have multiple reducers you can use this syntax, and behind the scened configureStore will merge all of them into one single reducer
  //| the keys can be any name of our choice, and the values are the different reducer functions (we are basically creating a map of reducers, which then will be merged into one)
  // reducer: { counter: counterSlice.reducer },

  //| since we only have a single reducer, we do this:
  reducer: counterSlice.reducer,
});

//% EXPORTING ACTIONS IN ORDER TO ACCESS THEM
//| to get ahold of the action identifiers, we can use
//| counterSlice.actions which is an object full of keys, where the key names
//| match the method names we have in our createSlice function in the reducers
//| and when we call them (remember that these are methods created by redux-toolkit)
//| with like counterSlice.actions.toggleCounter() return action objects with this shape:
//| { type: 'some auto generated unique identifier' }
//| therefore these methods are called "action creators" and they will create
//| action objects where these objects already have a type property with a unique
//| identifier per action (automatically created for us behind the scenes)
//| so we don't have to create those action objects on our own
//NB so we can tap into these actions object through counterSlice.actions and
//- then execute these action creator methods to dispatch actions, which will
//- then ultimately trigger those different reducer methods
export const counterActions = counterSlice.actions;
//- so we don't just export the store but also the actions
//- so then we can import them in the components where we need to dispatch these actions

export default store;
