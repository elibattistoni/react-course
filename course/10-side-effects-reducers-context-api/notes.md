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

# IMPORTANT TEACHER NOTES
# WHAT TO ADD AND NOT TO ADD AS DEPENDENCIES (lecture 112)
In the previous lecture, we explored useEffect() dependencies.
You learned, that you should add "everything" you use in the effect function as a dependency - i.e. all state variables and functions you use in there.
That is correct, but there are a few exceptions you should be aware of:
      - You DON'T need to add state updating functions (as we did in the last lecture with setFormIsValid): React guarantees that those functions never change, hence you don't need to add them as dependencies (you could though)
      - You also DON'T need to add "built-in" APIs or functions like fetch(), localStorage etc (functions and features built-into the browser and hence available globally): These browser APIs / global functions are not related to the React component render cycle and they also never change
      - You also DON'T need to add variables or functions you might've defined OUTSIDE of your components (e.g. if you create a new helper function in a separate file): Such functions or variables also are not created inside of a component function and hence changing them won't affect your components (components won't be re-evaluated if such variables or functions change and vice-versa)

So long story short: You must add all "things" you use in your effect function if those "things" could change because your component (or some parent component) re-rendered. That's why variables or state defined in component functions, props or functions defined in component functions have to be added as dependencies!

Here's a made-up dummy example to further clarify the above-mentioned scenarios:

```
import { useEffect, useState } from 'react';
 
let myTimer;
 
const MyComponent = (props) => {
    const [timerIsActive, setTimerIsActive] = useState(false);
 
    const { timerDuration } = props; // using destructuring to pull out specific props values
 
    useEffect(() => {
    if (!timerIsActive) {
        setTimerIsActive(true);
        myTimer = setTimeout(() => {
        setTimerIsActive(false);
        }, timerDuration);
    }
    }, [timerIsActive, timerDuration]);
};

```

In this example:
    - timerIsActive is added as a dependency because it's component state that may change when the component changes (e.g. because the state was updated)
    - timerDuration is added as a dependency because it's a prop value of that component - so it may change if a parent component changes that value (causing this MyComponent component to re-render as well)
    - setTimerIsActive is NOT added as a dependency because it's that exception: State updating functions could be added but don't have to be added since React guarantees that the functions themselves never change
    - myTimer is NOT added as a dependency because it's not a component-internal variable (i.e. not some state or a prop value) - it's defined outside of the component and changing it (no matter where) wouldn't cause the component to be re-evaluated
    - setTimeout is NOT added as a dependency because it's a built-in API (built-into the browser) - it's independent from React and your components, it doesn't change


# useEffect() cases
1. with no dependencies: in App.js
2. with dependencies in Login.js
3. DEBOUNCING: in Login.js