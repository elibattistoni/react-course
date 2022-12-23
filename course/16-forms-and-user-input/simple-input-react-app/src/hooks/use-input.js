import { useState } from "react";

const useInput = (validateValue) => {
  // as input argument we expect a function named validateValue
  //NB here we want to manage the value of a given input, the touch state, and its validity (combined with the touch state)
  //NB this hook should be flexible: the concrete validation logic should be passed into the hook from outside

  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    clearField: reset,
  };
};

export default useInput;
