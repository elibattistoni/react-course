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
  const [nameIsValid, setNameIsValid] = useState(true);

  //| --------------------------------------------------------------------------
  //| FORM SUBMISSION HANDLER
  //| --------------------------------------------------------------------------
  const formSubmissionHandler = (e) => {
    // prevent default of sending http request to browser & reload page (and restart app): instead do nothing
    e.preventDefault();

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

  return (
    <form onSubmit={formSubmissionHandler}>
      <div
        className={`${nameIsValid ? "form-control" : "form-control invalid"}`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
          ref={nameInputRef}
        />
        {!nameIsValid && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
