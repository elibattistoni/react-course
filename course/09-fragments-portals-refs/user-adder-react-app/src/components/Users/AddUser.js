import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import classes from "./AddUser.module.css";

/*
= Portals
# portals need 2 things: 1) a place where you want to port the Component to, and 2) you need to let the Component know that it should have a portal to that place
# 1) to mark the place, go to the index.html file and add a div with an id that you will use to identify that place with "backdrop-root" and "overlay-root"
# 2) go to the ErrorModal component definition and tell React that this component (ErrorModal) should be portaled somewhere (add the Backdrop component in ErrorModal.js)
*/

const AddUser = (props) => {
  // like all React Hooks, useRef is only usable inside of a function component
  //NB we are going to set up a connection with the input with id="username", and another connection with the input with id="age"
  //NB to connect them with the HTML element, the HTML element should have a special prop: "ref"
  const nameInputRef = useRef(); // initialized to undefined (default)
  const ageInputRef = useRef(); // initialized to undefined (default)
  //NB when React renders the JSX code that this component returns,
  //NB it will set the values stored in nameInputRef and ageInputRef to the native DOM element that is rendered based on this input
  //NB therefore nameInputRef and ageInputRef will be real DOM elements
  //NB we talk about UNCONTROLLED COMPONENTS when we use the approach of using refs to interact with DOM elements (specifically with input elements)
  //- UNCONTROLLED COMPONENTS = when we acces values with refs. UNCONTROLLED because their internal state (i.e. the value that is refelctd in them) is not controlled by React
  //- because we are not controlling the state with useState
  //NB with refs we don't feed data back into the input
  //NB the approach we have before, with useState was the CONTROLLED APPROACH (and we would say that those input fields are CONTROLLED COMPONENTS because their internal state is controlled by React)

  //IMPORTANT get rid because you are now using refs
  // const [enteredName, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    //NB log refs
    console.log(nameInputRef); //NB this is always an object with key "current" and this holds the actual value that the ref is connected with
    //NB and the actual value is the actual DOM node!!! which you can now manipulate etc BUT YOU SHOULD NOT (THE DOM SHOULD BE ONLY MANIPULATED BY REACT)
    //NB HOWEVER YOU CAN READ DATA FROM IT!!! =)
    console.log(nameInputRef.current.value);
    //NB so now we can get access to the values stored in the element without storing every keystroke
    //NB (which is what you do when you update the state of the component on every keystroke with setEnteredUsername and setEnteredAge)
    //NB we can just read it when the button is pressed
    //and thjerefore get rid of all the state updating functions and all the related variables and handlers

    const enteredRefName = nameInputRef.current.value;
    const enteredRefAge = ageInputRef.current.value;

    if (
      enteredRefName.trim().length === 0 ||
      enteredRefAge.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredRefAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredRefName, enteredRefAge);
    // reset with refs (NB normally you should not manipulate the DOM directly like this but only with React)
    // IMPORTANT: rarely use refs to manipulate the DOM like we do here fore resetting the input
    /// (it is fine only in the case of resetting input value because you are not really manipulating the DOM in the sense that you are not adding or removing elements)
    //NB the alternative is to go back to the useState solution
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";

    //IMPORTANT get rid because you are now using refs
    // setEnteredUsername("");
    // setEnteredAge("");
  };

  //IMPORTANT get rid because you are now using refs
  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  //IMPORTANT get rid because you are now using refs
  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            //IMPORTANT get rid because you are now using refs
            // value={enteredName}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            //IMPORTANT get rid because you are now using refs
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
