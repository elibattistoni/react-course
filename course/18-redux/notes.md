# Redux library

## What is Redux
Redux is a **state management system** for **cross-component or app-wide state**:
it helps us manage state, data that changes and affects our application and what we display on the screen; it helps us manage such data across multiple components ot even the complete app.

So far, to manage state we have used two IMPORTANT hooks **useState** and **useReducer**: and these hooks exist to allow us to manage data that typically changes e.g. when the suer clicks a button, and where changes to that data typically lead to the UI being updated

IMPORTANT
we can divide the definition of state into 3 main kinds of state:
1. LOCAL STATE (WITHIN-COMPONENT): local state is state/data that belongs to a single component (e.g. we listen to user input and we use useState to store that input with every keystroke in a state variable; or a button that toggles some detail field). Typically we manage such state inside of a component with useState or useReducer if it is more complex
2. CROSS-COMPONENT STATE: state that affects multiple components (e.g. open vs close state of a modal overlay --> the button the triggers the opening of the modal is per definition not in the modal) --> we can implement this with useState and useReducer but we need to pass props around, i.e. we need to build **props chains** or do some **props drilling**, where we pass props across multiple components (lwe cna also pass funcitons) so that these components can work together and manage state together --> this is not bad, it is not a bad practice: it is simply a bit more complex than the local state
3. APP-WIDE STATE: state that affects all the components of an application (e.g. user authentication, where you change the whole UI, what can be seen or not seen, depending on whether the user is authenticated or not) --> we can also use useState and building prop chains, and it works.

However, for **cross-component state** and **app-wide state** passing data and updating functions through props can become cumbersome --> and for this, we can use the **useContext** hook, and the concept of **React Context**: React COntext is a built-in feature of React that makes managing cross-component or application-wide state easier.

IMPORTANT: React Context and React Redux solve the same problem.

--------------------------------------------------------------------------------
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--------------------------------------------------------------------------------
### Why Redux?
NB React Context has a few **potential disadvantages**: "potential" because they might not matter in the app that you are building, and if they do not matter, then you don't need Redux. IMPORTANT you can also use React Context and React Redux in the same application:
- for application-wide state, use only one of the two (React Context OR Redux)
- you could use Redux for the general application-wide state, and use React Context for selected multi-component states which are important in parts of your application

NB DISADVANTAGES of React Context
1. **COMPLEX SETUP & MANAGEMENT** ==> managing state with React Context can become quite complex: for small or medium size applications, this is not a problem, but if you have a large app (an enterprise level app) with a lot of components and a lot of things going on, then with React Context can become very messy (you can end up with deeply nested JSX code as a result or an enormouse context provider component)
2. **PERFORMANCE** ==> React Context is great for low-frequency updates, like cahngin a theme or maybe also authentication, but not if your data changes a lot (i.e. for high frequency changes -- even if it is not clear what high frequency changes mean --> in any case, Context is not good for that) --> the React Context is not ready as a replacement for Flux-like state propagation (Redux is a Flux-like state management library --> i.e. **React Context is not really a great replacement for Redux in all scenarios, in all cases**)

--------------------------------------------------------------------------------
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--------------------------------------------------------------------------------
## How does Redux work?
Redux is all about having one **Central Data (State) Store** in you app: you never have more than one store!!
You would store authentication state theming, maybe some user input state, etc.
IMPORTANT we don't need to manage the entire store all the time.
We have data in that store, so that we can use it inside of our components (e.g. if the authentication status of a user changes, we want to know about that in a component, so we can react accordingly and update the UI).

#### Getting the data from the Central Data/State Store (First Redux concept: Central Data Store)
**COMPONENTS SET UP SUBSCRIPTIONS TO THE CENTRAL DATA STORE**: they subscribe to the Central Data Store, and whenever the data changes in the store, the store notifies the components, so that the components can get the data they need (e.g. the current authentication status) ("they get a slice of the Redux store") and then they can use it.

#### Changing/updating the data of the Central Data/State Store (Second Redux concept: Reducers)
IMPORTANT: **COMPONENTS NEVER MANIPULATE THE STORE DATA**: we have a direct data flow from the store to the components, but we do not have a direct data flow in the other direction; for this, we need a concept called **REDUCERS (REDU CER FUNCTIONS)**

We have to set up reducer functions that are responsible for mutating/changing/updating the store data (this is not the useReducer hook that we have seen before!) Reducer functions are a general concept: reducer functions take some input, then they transform that input, they reduce it (e.g. they can reduce a list of numbers to the sum of that number), and return a new result (--> this is a programming concept that both useReducer and the redux reducer functions use).

So how do we connnect the components to the reducer function? because ultimately it is something that happens inside of a component that triggers a change.

#### Connecting components to the Reducers (Third Redux concept: Dispatching Actions)
We have actions, and components dispatch actions (i.e. components trigger certain actions).
**ACTION** == a simple JavaScript object that describes the kind of operation that the Reducer should perform; therefore, Redux forwards the action to the Reduces, reads the description of the desired operation, and then the operation is performed by the Reducer.

1. Components define and dispatch actions
2. Redux forwards these actions to the Reducer
3. The Reducer performs the action to change/mutate the state in the Central Data Store (the Reducer returns a new state that replaces the existing state in the Central Data Store)
4. then Subscribing Components are notified so that they can update their UI



--------------------------------------------------------------------------------
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--------------------------------------------------------------------------------
## Redux Basics and using Redux with React

--------------------------------------------------------------------------------
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--------------------------------------------------------------------------------
## Redux Toolkit
this is a library that simplifies working with Redux


IMPORTANT install Redux DevTools!