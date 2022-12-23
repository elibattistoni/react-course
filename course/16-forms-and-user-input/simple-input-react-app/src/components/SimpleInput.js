import { useState, useRef } from "react";

// IMPORTANT keep in mind that two approaches are shown in this component! (one following state, and one following ref)
/// but in practice you only use one of these!!!

const SimpleInput = (props) => {
  //| --------------------------------------------------------------------------
  //| FETCHING THE INPUT - METHOD 1 --> on every keystroke
  //| --------------------------------------------------------------------------
  const [enteredName, setEnteredName] = useState("");
  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  //| --------------------------------------------------------------------------
  //| FETCHING THE INPUT - METHOD 2 --> with ref
  //| --------------------------------------------------------------------------
  const nameInputRef = useRef();

  //| --------------------------------------------------------------------------
  //| VALIDATION FEEDBACK
  //| --------------------------------------------------------------------------
  // const [nameIsValid, setNameIsValid] = useState(true); // NOT BEST PRACTICE
  const [nameIsValid, setNameIsValid] = useState(false); // THIS IS BETTER! BEST PRACTICE
  //NB this is a downside: we initially set this state to true just because we don't want to show the error message
  //NB so we treat the initial input as valid eve though it is not
  //NB there is also the proble that if you run a useEffect which sends an http request if the name is valid, then it sends it at the beginning, even though the name is not valid
  //NB so we can add another state:
  const [nameIsTouched, setNameIsTouched] = useState(false);
  // with this we can control whether the user has already added the entered name input field

  //| --------------------------------------------------------------------------
  //| FORM SUBMISSION HANDLER
  //| --------------------------------------------------------------------------
  const formSubmissionHandler = (e) => {
    // prevent default of sending http request to browser & reload page (and restart app): instead do nothing
    e.preventDefault();

    // NB we can assume that all inputs have been touched if the user clicks on Submit
    setNameIsTouched(true);

    //| ------------------------------------------------------------------------
    //| FORM VALIDATION
    //| ------------------------------------------------------------------------
    //| METHOD 1 --> with state
    if (enteredName.trim() === "") {
      setNameIsValid(false);
      return;
    }
    //| METHOD 2 --> with ref
    if (nameInputRef.current.value.trim() === "") {
      setNameIsValid(false);
      return;
    }

    setNameIsValid(true);
    //| ------------------------------------------------------------------------
    //| FETCHING INPUT ON FORM SUBMISSION
    //| ------------------------------------------------------------------------
    // NB in reality you use only one of these two methods!
    //| FETCHING THE INPUT WITH STATE (UPDATED ON EVERY KEYSTROKE)
    //NB method 1 on every keystroke: you can access the last state snapshot/last value of enteredName
    console.log(enteredName);
    //| FETCHING THE INPUT WITH REF
    // NB method 2 with ref
    const enteredValue = nameInputRef.current.value;
    // IMPORTANT: which method to choose? it depends on what you plan to do with the entered value
    //~ if you are interested only once, when the form is submitted ==> useRef
    //~ if you want instant validation, using the state is better because with ref you cannot do that
    //~ if you want to reset the form, the method with state on every keystroke is better (more elegant way of resetting the fields)
    // remember that to do that you need to set value={enteredName} in the input

    //| ------------------------------------------------------------------------
    //| RESET FIELDS (CLEAR FORM)
    //| ------------------------------------------------------------------------
    // NB resetting with state
    setEnteredName("");
    //NB reset with use ref (NB this is not ideal because we are directly manipulating the DOM here -- and you should not do this, React should be the only thing manipulating the DOM)
    nameInputRef.current.value = ""; // NB NOT IDEAL!!!!! DO NOT MANIPULATE THE DOM!!
  };

  // create a const which is true if the name is invalid after typing something
  const nameIsInvalidAfterTouching = nameIsTouched && !nameIsValid;
  console.log(nameIsInvalidAfterTouching);

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
