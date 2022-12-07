import { useState } from "react";
import "./ExpenseForm.css";

//==============================================================================
//# Gather user input
//==============================================================================
// on every keystroke, let's get the value the user entered and store it somewhere (e.g. log to console)
// onInput property --> react to every keystroke
// onChange --> does the same: it triggers on every keystroke but the advantage of the onChange event is that we can e.g. use the same event for all input types (e.g. also for dropdowns)
// NB these props under the hood add event listeners

//==============================================================================
//# Clear fields after submission: two-way binding
//==============================================================================
/*
by using state, we can have access to and implement the "two-way binding"
i.e. we don't simply listen for changes of the inputs, but we can also pass a value back into the input so that we can reset or change the input programmtically
all we have to do is to add the value="" attribute to the input element

/ two way binding because now we don't just listen to changes in the input to update our state, but we also feed the state back into the input so that when we change the state, we also change input
// the advantage is that when in the submitHandler() function we can now set the input back to empty strings
*/

const ExpenseForm = (props) => {
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
    // console.log(event.target.value);
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

  const submitHandler = (event) => {
    event.preventDefault(); // prevent page from reloading (whenever a form is submitted -- it automatically sends a request to the server that is hosting the webpage -- in our case our dev server)

    // gather inputted data when form submits
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };
    // console.log(expenseData);
    // NB however we need this data in App.js because there we want to add it to the array of expenses (+ we want to add an id)
    // NB so we need to pass the data that we are collecting and gathering here, in the ExpenseForm component to the App component
    // passing data from parent to child: you can do it with props
    // but passing data from child to parent??
    // IMPORTANT we can create our own event props on our components: this allowa us to pass a function from a parent component to a child component, and then call that function inside of the child component
    /// and when we call that function, we can pass data as parameters

    /*
    / VERY IMPORTANT: how to communicate / pass data between a child component and a parent component
    # in practice: we want to pass the expenseData gathered here in ExpenseForm to the NewExpense component (in NewExpense.js)
    # (you cannot skip the parent (NewExpense) and go directly to the grandparent (App) NB also when passing data from parent to child with props you cannot skip intermediate components)
    # so in NewExpense.js, add when calling the ExpenseForm component a new prop named onSaveExpenseData and the value of this prop should be a function that will be triggered when something happens inside of the ExpenseForm component
    # (in this case when the user saves the entered expense data, i.e. when submitting the form)
    # and inside the NewExpense component you define the function that should be the value of onSaveExpenseData
    # therefore here in this component the handler function is reachable by props.onSaveExpenseData
    # and inside this submitHandler we can access props.onSaveExpenseData and execute it here
    # we then need to communicate up, from inside NewExpense to App (because it is the App component which needs the new expense in order to add it to the expenses array)
    # in the App component define the addExpenseHandler
    */
    props.onSaveExpenseData(expenseData);

    // clear the input
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
          {/* with value you add the two-way binding */}
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
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
