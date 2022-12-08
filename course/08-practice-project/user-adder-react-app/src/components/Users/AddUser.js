import { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  //============================================================================
  //# Retrieve user input
  //============================================================================
  /*
  # to collect the values of the form, we can use a technique called State Management in React,
  # to update the state with every keystroke (i.e. "onChange") and hence save what the user enters in this state variable
  */
  // the starting input will be no input, i.e. empty string
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  //# state change handler functions
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  //============================================================================
  //# Handler function for form submission
  //============================================================================
  // handler function that should be executed when the for is submitted (i.e. onSubmit)
  const addUserHandler = (event) => {
    event.preventDefault();
    //============
    //# Validation
    //============
    // the user cannot submit the form if they have not entered anything
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      // define the error message that will be shown on the pop up windows
      setError({
        title: "Invlid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    // the user cannot insert an age that is smaller than 1 (NB with + you convert the string to a number)
    if (+enteredAge < 1) {
      // define error message for the pop up window
      setError({
        title: "Invlid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    // this code should execute only if we have a valid user input
    console.log("form submitted!");
    console.log(enteredUsername, enteredAge);
    const userData = { name: enteredUsername, age: enteredAge };
    props.onSubmitUserData(userData);
    //============
    //# reset user input
    //============
    setEnteredUsername("");
    setEnteredAge("");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {/* conditionally render the error, i.e. if error is not undefined then show the error */}
      {error && (
        <ErrorModal
          onCloseModal={errorHandler}
          errorTitle={error.title}
          errorMessage={error.message}
        />
      )}
      <Card className={classes.input}>
        {/* NB remember that on CUSTOM COMPONENTS we do not have a default className property, it is treated as a key of the props object */}
        {/* therefore when defining the Card component in Card.js you have to make sure that it can receive classes from props.className */}
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={usernameChangeHandler}
            value={enteredUsername}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            onChange={ageChangeHandler}
            value={enteredAge}
          />
          <Button type="submit">Add User</Button>
          {/* <button type="submit">Add User</button> */}
        </form>
      </Card>
    </div>
  );
};

/*
IMPORTANT notice that since "for" is a reserved word in Javascript, when you need
/ to write a label element for a specific input, instead of referring it with for, you use htmlFor
*/

export default AddUser;
