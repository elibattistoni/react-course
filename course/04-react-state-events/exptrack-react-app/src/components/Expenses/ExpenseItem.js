// import React from 'react'; // NB old react syntax
import { useState } from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  // NB it is a convention to name the functions that have to be triggered upon an event with eventName + Handler
  // so that it is clear that it is a function that is not called by us somewhere in the code
  // but that it is a function that is attached to an event listener so that it is called by react once the event occurs
  //= 1. REACTIVE: reacting to events
  // const clickHandler = () => {
  //   console.log("Clicked!");
  // };
  //= 2. REACTIVE: changing what shows up on the screen: the concept of STATE
  // let title = props.title;
  //const clickHandler = () => {
  // title = "UPDATED TITLE!";
  // console.log(title);
  /*
    NB this does not do anything!! React goes through all the components and
    - executes all the components functions and draws them on the screen only once, at the beginning when the page is loaded
    - when the application is intially rendered
    NB React never repeats that, after the intial rendering it is done
    NB so we need a way of telling React that something on the screen changed and that a certain component should be re-evaluated

    NB and this is where React introduces the special concept called State
    (state is not a React specific concept, but it is a key concept in React)
    and here in ExpenseItem we have a scenario in which we want to use that built-in state concept, because we want the title to change
    when the clickHandler executes and this is actually data that should make the component to be re-evaluated and re-drawn on the screen when it changes (when the title data changes)
    and regular variables with lest, const ecc do not trigger such re-evaluation
    NB in order to tell React that it should re-render this component because its data changed, we need to import the function useState from the React library
    - and this function allows us to define values as state, where changes to these values should reflect in the component function being called again
    NB useState() is a React Hook; IMPORTANT all the React Hooks can be recognized because they start with the work "use"
    NB these hooks must only be called inside of React component functions!!! they should not be called outside React component functions nor in nested functions, but they must be called only directly inside such component functions
    */
  //};

  /*
  NB useState() wants a default state value
  with useState we create a special kind of variable (NB a variable where changes will lead this component function to be called again)
  useState returns something: 1) it gives access to this special variable, and 2) it also returns a function that we can call to assign a new value to that variable
  it returns an array: the first element is the variable/element itself and the second element is the updating function
  */
  const [title, setTitle] = useState(props.title); // React Hook, function that allows us to define some values as state
  // title is a pointer to the managed value (therefore initally at props.title)
  //NB BEST PRACTICE naming convention: [title, setTitle]
  const clickHandler = () => {
    // state updating function:
    setTitle("Updated!"); // NB now the component is re-evaluated!
    console.log("updated title", title);
    //NB the component function in which you called this state updating function, in which you intialzed your state with useState will be executed again!!
    //NB this function does not change the value right away, but it schedules the state update, therefore in the very next line the new value is not available yet (look at the console!)
    //NB obviously it will re-evaluate only the component in which this state was registered, it will not re-evaluate all the components
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        {/* <h2>{props.title}</h2> */}
        <h2>{title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      {/* NB example to dive into event listeners and handlers NB the value of onClick is a function */}
      {/* IMPORTANT all the event handler props want a function as a value, which then is executed when that event occurs */}
      {/* <button onClick={() => {console.log("Clicked!")}}>Change Title</button> */}
      {/* NB only write the reference to the function, so that it is called when the event occurs. if you call it immediately with () then it will execute when the line <button... executes */}
      {/* on + event name capitalized -- you can do this on all elements that support an event */}
      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
};

export default ExpenseItem;
