# "Effect" or "Side Effect"


The React library, our components in the React App has one main Job: RENDER THE UI, REACT TO USER INPUT, RE-RENDER THE UI WHEN NEEDED

EFFECT = SIDE EFFECT = tasks not related to bring something DIRECTLY onto the screen = everything else that happens in the application, e.g. sending HTTP requests to backend servers, storing something in the browser storage, setting & managing timers and intervals; you could send HTTP requests to then draw somehitng on the screen once you get the response, but sending the request itself and handling potential errors and so on is not something for which you need React for. **These are tasks that must happen outside of the normal component evaluation, i.e. outside of your normal component function** (don't forget that e.g. the App function is re-executed by React automatically whenever the state in this component function changes; the entire component funciton re-reuns and then React basically compares the result of the function execution with the result of the previous function executions then makes the detected changes in the DOM). So if you run an HTTP request inside the App component function, then you would send the request every time the function re-runs, so whenever the state changes (this is something that you might want sometimes but not always) and if in response to your HTTP request you e.g. change some state, then you would create an infinite loop

#### therefore such SIDE EFFECTS should not go directly into this component function because that would most likely create bugs, infinite loops, or e.g. sending too many HTTP requests
#### we have a better tool for handling side effects, i.e. a React Hook called **useEffect() Hook**

useEffect() is a built-in React Hook that you can use inside your component function; it is called with 2 arguments

`useEffect( () => { ... }, [ dependencies] )`
    - first argument: a function that should be executed after every component evaluation if the specified dependencies changed (**the side effect code goes into this function**)
    - second argument: dependencies of this effect (the function only runs if the dependencies changed) ==> an array of dependencies (**specify your dependencies of your function here**)
The code specified in the function (the first argument) will execute only when the dependencies specified change, and not when the component re-renders