import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

//==============================================================================
//# component that renders the form
//==============================================================================
// it contains some validation logic
// at the moment this validation works in this way: for every keystroke on the email field,
// the emailChangeHandler runs and it sets the form as valid if the email conteins the @ symbol and the entered password is longer than 6 chars
// and for every keystroke in the password fiels, the passwordChangeHandler runs and it sets the form as valid if the same conditions are met
// validateEmailHandler runs when the email field loses focus (i.e. on blur) so that they can be marked as invalid (if they are invalid)
// validatePasswordHandler runs when the password field loses focus (i.e. on blur) so "" ""

// NB here we couls use useEffect to restructure the validation logic: instead of having the same logic in the emailChangeHandler and in the passwordChangeHandler
// NB we could use useEffect to have one place where we mark the form as valid or invalid with one logic, which should trigger whenever the email or password changed
// NB and this is where we need the extra dependency
const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(
    () => {
      // NB we want to re-evaluate this effect function and re-run
      // NB the form validation state setting function for every keystroke in emailChangeHandler and passwordChageHandler
      // keep in mind that listening to every keystroke and saving the entered data is also a side effect (like we do in the emailChangeHandler function)
      // and we then want to trigger another action in response to that (i.e. checking and updating the form validity in response to a keystroke in the email or password field)
      // this is a side effect of the user entering data
      //# in general, useEffect is an important hook that helps you deal with code that should be executed in response to something
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    },
    // NB the rule is: add as dependencies what you are using in your side effect function
    // NB this tells React that after every Login component function execution, it will re-run this useEffect function
    // NB BUT ONLY IF EITHER setFormIsValid, OR enteredEmail, OR enteredPassword CHANGED IN THE LAST COMPONENT RERENDER CYCLE
    // NB if none of these three items have changed, the effect function will not rerun
    // NB you can also remove setFormIsValid because these state updating functions by default never change (React ensures that they never change)
    // [setFormIsValid, enteredEmail, enteredPassword]
    [enteredEmail, enteredPassword]
  );

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    //# previous validation logic (before useEffect)
    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    //# previous validation logic (before useEffect)
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes("@")
    // );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
