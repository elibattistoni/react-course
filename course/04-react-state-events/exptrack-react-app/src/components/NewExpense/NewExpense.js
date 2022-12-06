/*
Here we want to render a form where users can enter their expense data
*/

import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = () => {
  return (
    <div className="new-expense">
      <ExpenseForm />
    </div>
  );
};

export default NewExpense;
