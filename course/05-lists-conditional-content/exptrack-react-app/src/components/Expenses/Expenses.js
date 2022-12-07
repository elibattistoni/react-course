import { useState } from "react";

import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter(
    (expense) => expense.date.getFullYear().toString() === filteredYear
  );

  let expensesContent = <p>No expenses found.</p>;
  if (filteredExpenses.length > 0) {
    expensesContent = filteredExpenses.map((expense) => (
      <ExpenseItem
        key={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
      />
    ));
    // NB you should always add the key prop when rendering lists of items!!!
  }

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        {/* conditional content */}
        {expensesContent}
      </Card>
    </div>
  );
};

export default Expenses;

/*
= CONDITIONAL CONTENT = rendering different outputs under different conditions
i.e. if you select a year in the drop-down and for that year we have no ExpenseItem,
then we want to rendere a message telling the user that we have no items for the chosen filter
and for that we want to render content conditionally

/ OPTION 1
you can split the long ternary expression into 2 stand alone expressions that check different conditions
instead of the ternary operator which makes things a bit hard to read you can use a Javascript trick, i.e. the && (and) operator
so that if the condition is met, it returns the part after the && operator

{filteredExpenses.length === 0 && <p>No expenses found.</p>}
{filteredExpenses.length === 0 &&
  filteredExpenses.map((expense) => (
    <ExpenseItem
    key={expense.id}
    title={expense.title}
    amount={expense.amount}
    date={expense.date}
    />
    ))}
    
/ OPTION 2
you can use variables e.g. expensesContent

*/
