import { useState } from "react";
import "./ExpenseForm.css";

//==============================================================================
//# Gather user input
//==============================================================================
// on every keystroke, let's get the value the user entered and store it somewhere (e.g. log to console)
// onInput property --> react to every keystroke
// onChange --> does the same: it triggers on every keystroke but the advantage of the onChange event is that we can e.g. use the same event for all input types (e.g. also for dropdowns)
// NB these props under the hood add event listeners

const ExpenseForm = () => {
  //### MULTIPLE STATES: APPROACH 1
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState(""); // we can initialize all states as a string because by default whenever you listen to the change event for an input, if you read the value of that input element it will always be a string
  const [enteredDate, setEnteredDate] = useState("");
  // IMPORTANT you can and you will have (and it is totally fine) multiple states (state slices or state pieces) per component; and they will be completely separated from each other
  // NB there is an alternative to having multiple states (and it is a matter of personal preference which one to use)
  //### MULTIPLE STATES: APPROACH 2
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: "",
  //   enteredAmount: "",
  //   enteredDate: "",
  // });
  // if you want to group them in this way, the key difference with the other approach is that
  // whenever you update this state you need to update all 3 properties and not just one

  const titleChangeHandler = (event) => {
    // get the value the user is entering
    console.log(event.target.value);
    // change state of enteredTitle with the current value
    //### MULTIPLE STATES: APPROACH 1
    setEnteredTitle(event.target.value);
    // NB we are doing this here not really to update the state but to ensure
    //- that we are storing the value in some variabel that is detached from the life cycle of this component function
    //- so that no matter how often this component function is executed again, this state is stored and survives
    // we will need this state for updating and re-rendering the component anyway

    //### MULTIPLE STATES: APPROACH 2
    // NB when updating one single property with this approach, you need to carry also the "non-updated" properties otherwise they will get lost
    // you can copy paste like they are, otherwise spread the values and overwrite the one that was updated
    //# approach 2.a
    // setUserInput({
    //   ...userInput,
    //   enteredTitle: event.target.value,
    // }); //NB this is not a good practice, you should not update the state like this:
    /// whenever you update your state and you depend on the previous state, you should use another form of the state updating function
    //# approach 2.b BEST PRACTICE whenever your state update depends on the previous state
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredTitle: event.target.value };
    // });
    // why it should be written like this? remember that React shcedules state updates, it does not perform them instantly
    // therefore if you rely on the bad practice approach (approach 2.a), you could be depending on an outdated or incorrect state snapshot
    // but if you rely on the second approach (approach 2.b) react will guarantee that the state snapshot that is the parameter prevState in the inner function is always the latest state snapshot (keeping all scheduled updates in mind)
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  return (
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" onChange={titleChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
