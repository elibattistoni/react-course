Redux is not React specific. Redux can be used in any JavaScript project and it does not know anything about React. So, to make working with Redux in React applications easier, we have to install a second package: react-redux. This is a package that makes connecting react applications to redux stores, reducers, subscribe components etc,. very simple.

`npm install redux react-redux`

# Get started with React-Redux
- create a folder named "store" inside the src folder (common convention to store the redux related code)
- inside this folder, create a "index.js" file (path: "src/store/index.js"), in which we will insert all the redux logic: in here, you will only insert the **creation of the store** and **the creation of the reducer** (not the part of the subscription!!)
- in order to connect the react app to the redux store and reducer, so that the components can listen and dispatch: we typically go to the highest level we can go in our react app, i.e. in the index.js file in our react app, where we render the root component; in here, you import the provider from react-redux and wrap the toor component with this provider (like we used the context provider component in previous modules); IMPORTANT you could also use the provider not on the highest component level: you could also wrap nested components with provider, but only the components whose parent tree starts with the wrapped component will access to redux. we also have to import our store, to tell redux which is our store.


## Attaching Payloads to Actions
so far we have dispatched simple actions. In reality, you often want to dispatch functions that also carry an extra value.
To make applications and actions scalable (e.g. I wnat to increase the counter by 5, not just by 1), when dispatching actions we can also pass other values other than types: e.g. you wnat to increase (action type) by 5 (value)