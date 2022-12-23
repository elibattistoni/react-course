import { useState, useRef } from "react";

// NB you should perform validation also when input loses focus i.e., on blur

const SimpleInput = (props) => {
  //| FETCHING THE INPUT - BEST PRACTICE --> with ref
  const nameInputRef = useRef();

  //| FETCHING THE INPUT - BEST PRACTICE FOR CLEARING FIELDS --> on every keystroke
  const [enteredName, setEnteredName] = useState("");

  //| VALIDATION FEEDBACK
  const [nameIsValid, setNameIsValid] = useState(false); // THIS IS BETTER! BEST PRACTICE
  const [nameIsTouched, setNameIsTouched] = useState(false);
  // with this we can control whether the user has already added the entered name input field

  //| UPDATE STATE set value of enteredName on every keystroke
  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);

    // not set to true as soon as there is valid input
    // remember that if you here use "enteredName" that state snapshot might not be updated
    if (e.target.value.trim() != "") {
      setNameIsValid(true);
    }
  };

  // NB perform validation when input loses focus (i.e. on blur)
  const nameInputBlurHandler = () => {
    setNameIsTouched(true);
    if (enteredName.trim() === "") {
      setNameIsValid(false);
    }

    // NB but now we want to validate on every keystroke, but only in combination with the other validation steps we integrated before
    // it would not be good to only validate on every keystroke because you want to give them a chance to write something correct before
  };

  //| FORM SUBMISSION HANDLER
  const formSubmissionHandler = (e) => {
    e.preventDefault();

    setNameIsTouched(true); // all inputs have been touched if the user clicks on submit

    //| FORM VALIDATION (with state)
    if (enteredName.trim() === "") {
      setNameIsValid(false);
      return;
    }

    setNameIsValid(true);

    //| FETCHING INPUT ON FORM SUBMISSION WITH REF
    const enteredValue = nameInputRef.current.value;

    //| RESET FIELDS (CLEAR FORM) with state
    setEnteredName("");
  };

  // create a const which is true if the name is invalid after typing something
  const nameIsInvalidAfterTouching = nameIsTouched && !nameIsValid;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div
        className={`${
          nameIsInvalidAfterTouching ? "form-control invalid" : "form-control"
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
          ref={nameInputRef}
        />
        {nameIsInvalidAfterTouching && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
