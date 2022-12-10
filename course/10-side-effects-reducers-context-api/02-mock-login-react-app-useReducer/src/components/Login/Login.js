import React, { useState, useReducer, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

//# this function can be defined outside of the component function because it does not need to interact with anything that is generated inside of the component function
// all the data that is needed for this function will be passed as an argument when it is executed automatically by React
const emailReducer = (state, action) => {
  //NB here state is GUARANTEED to be the latest snapshot
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  //NB you could think all of these states as being all one big state that describer the overall form state
  //NB the inputs are part of that:
  //NB you treat every input as one entity and one state, and the state has 2 aspects: the value the user entered and the validity of the input
  //NB i.e. enteredEmail and emailIsValid belong together, and you therefore might want to manage them together
  //NB and let's say that we don't want to use useEffect

  // IMPORTANT good use case for useReducer (a good replacement of useState): when you have states that belong together (with the entered value and the validity of the value)
  /// and/or if you have state updates that depend on some other state/s
  /// i.e. for setting the state of the email is valid, we are looking at the state of the entered email (AND YOU SHOULD NOT DO THIS because you don't know when React is going to update a state)

  //== NB with useReducer() we could either 1) manage multiple smaller stated (combining entered values and validities fo email, and for password) or 2) manage one overall big form state with it
  //# to begin, we will go with option 1)

  //== Managing the email state & password state
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  // NB useEffect is a good way of updating a state based on another states
  // this will run for every state update React performs, which was not the case before
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("check form validity");
      setFormIsValid(passwordIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // the action is: { type: "USER_INPUT", val: event.target.value }
    // this will trigger the emailReducer funcion to execute
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
