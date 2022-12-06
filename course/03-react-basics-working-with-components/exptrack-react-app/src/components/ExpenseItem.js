// IMPORTANT in React components there is one important rule
/// regarding the JSX code that is returned: you must return only one root element per return statement (or per JSX code snippet)

function ExpenseItem() {
  return (
    <div>
      <div>Date</div>
      <div>
        <h2>Title</h2>
        <div>Amount</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
