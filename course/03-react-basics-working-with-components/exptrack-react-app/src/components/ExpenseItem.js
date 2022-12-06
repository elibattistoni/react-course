// IMPORTANT in React components there is one important rule
/// regarding the JSX code that is returned: you must return only one root element per return statement (or per JSX code snippet)

//# CSS styling
import "./ExpenseItem.css"; // this simply tells the build process that this CSS file should be considered
// NB in JSX you don't write class="" like in regular css but instead write className="" (because the wor class is a reserved work in JavaScript)

function ExpenseItem() {
  return (
    <div className="expense-item">
      <div>Date</div>
      <div className="expense-item__description">
        <h2>Title</h2>
        <div className="expense-item__price">Amount</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
