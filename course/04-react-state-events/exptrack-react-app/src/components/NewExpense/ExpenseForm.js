import "./ExpenseForm.css";

//==============================================================================
//# Gather user input
//==============================================================================
// on every keystroke, let's get the value the user entered and store it somewhere (e.g. log to console)
// onInput property --> react to every keystroke
// onChange --> does the same: it triggers on every keystroke but the advantage of the onChange event is that we can e.g. use the same event for all input types (e.g. also for dropdowns)
// NB these props under the hood add event listeners

const ExpenseForm = () => {
  const titleChangeHandler = (event) => {
    //# here we want to get the value the user is entering
    console.log(event.target.value);
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
          <input type="number" min="0.01" step="0.01" />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" min="2019-01-01" max="2022-12-31" />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
