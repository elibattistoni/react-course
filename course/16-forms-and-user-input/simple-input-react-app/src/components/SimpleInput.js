import { useState, useRef } from "react";

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
  //| FORM SUBMISSION HANDLER
  //| --------------------------------------------------------------------------
  const formSubmissionHandler = (e) => {
    // prevent default of sending http request to browser & reload page (and restart app): instead do nothing
    e.preventDefault();

    //### NB in reality you use only one of these two methods!
    //NB method 1 on every keystroke: you can access the last state snapshot/last value of enteredName
    console.log(enteredName);

    // NB method 2 with ref
    const enteredValue = nameInputRef.current.value;

    // IMPORTANT: which method to choose? it depends on what you plan to do with the entered value
    //~ if you are interested only once, when the form is submitted ==> useRef
    //~ if you want instant validation, using the state is better because with ref you cannot do that

    //~ if you want to reset the form, the method with state on every keystroke is better (more elegant way of resetting the fields)
    // remember that to do that you need to set value={enteredName} in the input

    // NB resetting with state
    setEnteredName("");

    //NB reset with use ref (NB this is not ideal because we are directly manipulating the DOM here -- and you should not do this, React should be the only thing manipulating the DOM)
    nameInputRef.current.value = ""; // NB NOT IDEAL!!!!! DO NOT MANIPULATE THE DOM!!
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
          ref={nameInputRef}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
