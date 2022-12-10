# useReducer()
useReducer is another built-in React Hook that heps with state management. It is similar to useState but it has more features/capabilities, especially useful for more complex states. Sometimes ou have more complex states, e.g. multiple states that belong together / that are managing the same thing, but just different aspects of it.
So **useReducer() can be used as a replacement for useState() if you need "more powerful state management"**.

NB this does not mean that you should always use useReducer() also because it is a bit more complex and requires more setup. Most of the time useState is the perfect solution, but there are cases in which useReducer is better in order to avoid bugs that can happen with using useState().

Go to Login.js.