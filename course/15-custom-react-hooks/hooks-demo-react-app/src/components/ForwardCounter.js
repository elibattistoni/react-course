// import { useState, useEffect } from "react";

import useCounter from "../hooks/use-counter";
import Card from "./Card";

//| this forward counter uses useState and useEffect to manage state and to create an interval that starts counting up
//| and every second sets a new counter state
//| the backward counter component does the same thing, but instead of counting up it counts down
//| therefore we have some dubliction in the forward and backward counter
//| so if you want to refactor this code into a separate function, and be able to use
//| built-in hooks inside this function, you just create this general function which
//| will be a custom hook because otherwise you cannot use hooks inside it
// IMPORTANT we store a custom hook in a standalone file: create a hooks folder in the src folder, next to the components folder
/// and in there add the use-counter.js and MUST DO inside this file you create your custom hook function and its name must start with use
/// use at their beginning tells react that it will be a custom hook
/// and it gives the reacts the guarantee that you will use that function by respecting
/// these rules of hooks (you will use this custom hook function just as you use the built-in hooks)
/// the project set up will give you a warning if you have a function starting with use
/// and you then start violating some of these rules of hooks

const ForwardCounter = () => {
  //- logic without custom hook
  // const [counter, setCounter] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((prevCounter) => prevCounter + 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // NB CUSTOM HOOK
  // NB if you call a custom hook in one of your components and, for example,
  // NB that component registres a state or an effect (like we do inside useCounter),
  // NB then this state and this effect will be tied to the component in which you use your custom hook
  // NB if we use a custom hook in multiple components, every component will receive its own state:
  // NB just because we use a common custom hook, it does not mean that the state or the effect inside the custom hook definition are shared.
  // NB instead, for every component the custom hook is executed again, and every component instance receives its own state
  // NB so it is just the logic that is shared, not the concrete state or effect
  const counter = useCounter();

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
