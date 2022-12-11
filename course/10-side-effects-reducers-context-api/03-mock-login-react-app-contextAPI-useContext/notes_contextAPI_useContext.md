# The problem
In bigger React applications, you might face a "problem": passing a lot of data through a lot of components via props.
This can be solved in an elegant way.

A good example can be found in App.js, where there is the *isLoggedIn* state and all the login functions; we are managing this state in the App component because we lifted the state up to the App component, becuase we need this isLoggedIn state and the login updating functions basically everywhere in the application.

It is quite common to pass data to components through props, but **it is always a problem if you forward the state through multiple components** (i.e. if you basically just leverage props to forward data to another component)

NB best practice use props in a component to only receive the data this component really needs from its parent, and not to forward our data from the parent to the child if the parent does not even need it.
For this we have a component-wide "behind the scenes" state storage built into React, i.e. "React context" and this allows us, e.g. to trigger an action in that component-wide state storage and then directly pass that to the component that is interested withouth building such a long props chain.

this React Context Concept, which allows us to manage State kind of behind the scenes in React, such that we actually are able to directly change it from any component in our App and directly pass it to any component in our App without building such a prop chain.

# How to use
- in the source (src) folder, create a subfolder named "context" or "store" or "state"; since we are going to manage authentication states, let's add a file named "auth-context.js" (better using kebab case) NB you can have multiple contexts for multiple global states in your app (and if you want you can use just one context for a bigger state -- it's up to you)

# Dynamic Context
NB we can set up a dynamic context where we don't just pass data to our component but also functions

NB when to use props vs. context: in most cases you will use props to pass data to components because props are our mechanism to configure components and make them reusable. Only if you have some data that is forwarded through a lot of components, and you are forwarding it to a component that does something very specific (e.g. the Navigation component in thish the Button always logs the user out) only in these cases you want to consider context

# Building & using a custom context provider component
- depending on your application structure and how you are managing data, you might also want to pull more logic out of the App component and create a separate Context Management component (cfr auth-context.js)