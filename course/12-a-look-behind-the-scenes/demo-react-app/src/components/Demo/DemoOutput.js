import React from "react";

import MyParagraph from "./MyParagraph";

const DemoOutput = (props) => {
  console.log("DemoOutput RUNNING");
  return <MyParagraph>{props.show ? "This is new!" : ""}</MyParagraph>;
};

// NB prevent unnecessary component re-evaluation: re-evaluate only if props have changed, not if simply parent has changed
export default React.memo(DemoOutput);

/*
| React.memo() allows to optimize functional components:
| React.memo() tells React that for this component (the component as input argument), it should look only at the props
| this compnent gets, and compare the new value with the current value, and only if that value has changed, the component should be re-executed
| and re-evaluated
| importantly: if the parent component changed, but the prop values for this component did not change, then component execution will be skipped.

| so why shouldn't we use this memo() on all components? Because it is costly, because React needs to do 2 things:
| 1) store the previous prop values and 2) make the comparison

- therefore choose wisely: it really depends on the component on which you are applying this to:
- should you trade the performance cost of re-evaluating the component for the performance cost of comparing props?
And it's impossible to say which cost is higher because it depends on the number of
props you have and on the complexity of your component and the number of child components your component has

-- React.memo can be a great tool if you have a huge component tree with a lot of child components.
And on a high level in the component tree, you can avoid unnecessary re-render cycles for the entire branch of the component tree.
(by avoiding the re-evaluation of a component that is the parent of many other components, you avoid also all these other child components to be re-evaluated)
it depends on your app size. For small apps, for small component trees, and so on, for all of that, it might simply not worth it to add this.
But for larger apps where you can cut off entire branches of unnecessary re-evaluations, it might very well be worth it.
you wanna pick some key parts in your component tree which allows you to cut off an entire branch of child components. That's way more effective than doing this on every child component.

--If you, on the other hand, have a component whose props values are going to change on every re-evaluation of the parent component,
then React.memo doesn't make a lot of sense because if the component should re-render anyways,
then you can also save that extra comparison of the prop values. That is is not worth it.
*/

/*
IMPORTANT the comparison that in JS reference values are always different, whereas privimive values can be equal
React.memo() has worked for the DemoOutput component (it avoided its re-evaluation because on subsequetn re-evaluations of the main App component the value of false does not change)
whereas it is ignored (and a component therefore re-evaluated) for the Button component if the value of a prop is a reference value (e.g. function) that even if it is the same, when the App component re-evaluates it creates a new function
and therefore it is intrpreted as a new value by react (a new function object is created anew every time the App function is re-evaluated (e.g. because its state has changed))

2 === 2 --> true
true === true --> true
[1,2,3] === [1,2,3] --> false
two objects in JS are not equal even if they have the same content

-- Does this mean that React.memo is useless for components that receive objects or arrays or functions through their props? No: with the useCallback() hook
We can make React Memo work for prop values that are objects as well.
We just need to tweak the way we create and store those objects a little bit.
There is an extra hook provided by React that helps us with that: the useCallback Hook.
NB useCallback() is a hook that allows us to store a function across component executions:
- it allows us to tell React that we want to save a function and that this function should not be recreated with every execution
- with this, the comparison work because only one function value is stored in memory
NB so if we know for certain that a function never changes, we can useCallback to store it
NB like with useEffect, useCallback wants a second argument: an array of dependencies
*/
