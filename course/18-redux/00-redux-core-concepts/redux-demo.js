//NB we will run this file with nodeJS therefore the imports will be different from those that we are used to with React
const redux = require("redux");

//| IMPORTANT STEPS
//| 1. create the store
//| 2. create the reducer function that changes the store
//| 3. create a component and an action that is dispatched by the component
//|   (NB since we are not using react for this demo, we will create any other code that sets up a subscription to the store)

//NB 1. CREATE STORE
// const store = redux.createStore();
//| this store should manage some data and the data that it manages, is determined
//| by the reducer function (because it is the reducer funciton that will create
//| new state snapshots -- whenever an action reaches the reducer, it has to return a new state snapshot)
//| and when we run this code for the first time, the reducer will also be executed with a "default" action that should spit out the initial state
//| so we also have to define a reducer function

//NB 2. CREATE REDUCER FUNCTION
//| a reducer function is a standard Javascript function, but it will be called
//| by the Redux library and it will always receive two input arguments: the current state, and the action that was dispatched
//| and the reducer function will always return a new state object (it can be also a numer or string, nut in reality it usually is an object)
//| therefore, a reducer function should always be a pure function: "pure" means that:
//| 1) for specific input values, it will return the exact same output values;
//| 2) it shouyld not have any side effect inside (e.g. you should not send HTTP requests, save or retrieve something from the local storage)
const counterReducer = (currentState = { counter: 0 }, action) => {
  //| IMPORTANT the first time that this function executes, it has no state, so we should give the currentState a defualt value that is used only the first time it runs
  //| for the following executions, it will have a currentState (therefore the default state will not be used)

  //| typically when using Redux, the goal is to do different things inside of the reducer for different actions
  if (action.type === "increment") return { counter: currentState.counter + 1 };
  if (action.type === "decrement") return { counter: currentState.counter - 1 };

  // if the action type is not INCREMENT (e.g. for the initialization), then we return the initial state
  return currentState;
};

//NB 3. create store and pass the reducer function to the create store function, because the stopre needs to know which reducer is responsible for changing the store
const store = redux.createStore(counterReducer);

//NB 4. create object (component) that subscribes to the store, and that dispatches an action
const counterSubscriber = () => {
  //| this function does not get any parameter, but here we can reach out to the store and call it:
  //| .getState() is a method that is available on the store created with createStore, and it will return the latest snapshot after it was updated
  //| so the subscription function will be triggered whenever the state changes
  const latestState = store.getState();
  console.log(latestState);
};

//NB 5. link the subscribed component to the store
//| now we need to make Redux aware of this subscriber function and tell it that this function should be executed whenever the state changes
store.subscribe(counterSubscriber);
//| the subscribe method want a function that Redux will then execute for us whenever the data and the store changes
//| both the reducer and the subscriber functions will be executed by Redux

//NB 6. create and dispatch action
//| the input argument is a JS object with a type property
//| and the value of this property is a unique string (each dispatch aciton should have a different string and be unique NB each styring leads to different actions in the reducer)
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });

//NB you can use Redux in any JavaScript project! it is not a library restricted to React
