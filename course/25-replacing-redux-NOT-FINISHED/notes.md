# Replacing Redux with React Context API + Hooks

There is nothing wrong with Redux, but if you want to replace, this means that you don't have to add a third party library to your app.

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------

# React 18 & this section
This section was recorded with React 17 - therefore, in index.js, you will see slightly different code (that is the only change though - everything you learn in this section still applies!).

You can update the project to React 18 with these two steps:

1) npm install --save react@latest react-dom@latest

2) Update index.js:

Replace

    ReactDOM.render(<App />, document.getElementById('root'));

with

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);

That's all - as mentioned, this is the only change. Everything you learn in this section is up-to-date with the latest version of React.

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------

# How to manage your state globally without passing everything through props, but still without using Redux
Here we will see 2 approaches for managing state with React-only tools: one of those approaches is good, the other is not that great.

### Approach 1: React Context API
Sometimes it is the right choice buyt not always.

IMPORTANT Disadvantage: the Context API is good for low-frequency updates but not for high-frequency updates. e.g. user authentication status --> ok with context API; or themeing; but for example toggling the favorites is a relatively high frequency change, or managing a shopping cart --> the context API is not intended for managin all the state, but only some parts, the parts that change not often

but for high frequency changes there is still a non-Redux alternative: with custom Hooks

### Approach 2: React Custom Hooks
