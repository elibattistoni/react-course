# useReducer()
useReducer is another built-in React Hook that heps with state management. It is similar to useState but it has more features/capabilities, especially useful for more complex states. Sometimes ou have more complex states, e.g. multiple states that belong together / that are managing the same thing, but just different aspects of it.
So **useReducer() can be used as a replacement for useState() if you need "more powerful state management"**.

NB this does not mean that you should always use useReducer() also because it is a bit more complex and requires more setup. Most of the time useState is the perfect solution, but there are cases in which useReducer is better in order to avoid bugs that can happen with using useState().

Go to Login.js.

# How does useReducer() work?

```
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn)

```
- *state* ==> the state snapshot used in the component re-render / re-evaluation cycle
- *dispatchFn* ==> a function that allows you to update that state snapshot (setting a new state value) + it is a function that can be used to dispatch a new action (i.e. trigger an update of the state); this action will be consumed by the first argument you pass to useReducer, i.e. a reducer function
- *reducerFn* ==> this is a function that gets the latest state snapshot automatically (because it will be called by React) and it gets the action that was dispatched; React will call this reducer function whenever a new action is dispatched: `reducerFn(prevState, action) => newState` (the action that was dispatched triggered the reducer function execution); the reducer function returns a new updated state
- *initialState* ==> initial state (OPTIONAL??)
- *initFn* ==> initial function that should run to set the initial state in case your initial state is a bit more complex (e.g. the result of an HTTP request or similar) (OPTIONAL??)