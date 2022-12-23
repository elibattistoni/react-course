import { useEffect, useState } from "react";

// IMPORTANT With that, we have a relatively lean component here,
/// which manages the input value and the touched state, and then derives to validity from those states.

// NB you should perform validation also when input loses focus i.e., on blur

const SimpleInput = (props) => {
  //| FETCHING THE INPUT - BEST PRACTICE FOR CLEARING FIELDS --> on every keystroke
  const [enteredName, setEnteredName] = useState("");
  //| VALIDATION FEEDBACK
  const [nameIsTouched, setNameIsTouched] = useState(false);
  // with this we can control whether the user has already added the entered name input field
  // NB we can derive the validity of the name input from the enteredName and the nameIsTouched states:
  // NB since the component re-executes whenever one of its states changes, then this constant will always be up to date
  const nameIsValid = enteredName.trim() !== ""; // with this trick we do not need to handle the state of validity
  // create a const which is true if the name is invalid after typing something
  const nameIsInvalidAfterTouching = nameIsTouched && !nameIsValid;

  /// IMPORTANT: overall form state: run the effect whenever one of the input changes
  // there should be one depenency for each form field
  // e.g. nameIsValid, ageIsValid, fiscalCodeIsValid,...
  // so this effect, which evaluates the overall form state, runs when the component is first rendered and when one iunput changes
  // and you can use this state (formIsValid) to disable/enable the submit button
  // const [formIsValid, setFormIsValid] = useState(false);
  // useEffect(() => {
  //   if (nameIsValid) setFormIsValid(true);
  //   else setFormIsValid(false);
  // }, [nameIsValid]);
  // you could do this with use effect, but it does not add anything valuable
  //| best practice:
  let formIsValid = false;
  if (nameIsValid) formIsValid = true;

  //| UPDATE STATE set value of enteredName on every keystroke
  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  // NB perform validation when input loses focus (i.e. on blur)
  const nameInputBlurHandler = () => {
    setNameIsTouched(true);
  };

  //| FORM SUBMISSION HANDLER
  const formSubmissionHandler = (e) => {
    e.preventDefault();

    setNameIsTouched(true); // all inputs have been touched if the user clicks on submit

    if (!nameIsValid) return;

    //| FETCHING INPUT ON FORM SUBMISSION WITH REF is the best practice, here we can do it with state
    console.log(enteredName);

    //| RESET FIELDS (CLEAR FORM) with state
    setEnteredName("");
    setNameIsTouched(false);
  };

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
        />
        {nameIsInvalidAfterTouching && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
