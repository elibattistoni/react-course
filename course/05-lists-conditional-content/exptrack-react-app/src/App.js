import { useState } from "react";
import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    /// VERY IMPORTANT
    // add new expense at the beginning and use the spread operator to get the values of the expenses array to form a new array
    // setExpenses([expense, ...expenses]); // NB this is not correct because you want to update your state based on your previous state
    //NB this is a case in which you need to update your state based on your previous state
    //NB so you should use a special function form, so you pass a function to the state updating function, and that function will automatically receive the latest state snapshot
    setExpenses((previousExpenses) => {
      return [expense, ...previousExpenses];
    });
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;

/*
we are getting this warning:

/Warning: Each child in a list should have a unique "key" prop.
/
/Check the render method of `Expenses`. See https://reactjs.org/link/warning-keys for more information.
/    at ExpenseItem (http://localhost:3000/static/js/bundle.js:244:19)
/    at Expenses (http://localhost:3000/static/js/bundle.js:345:90)
/    at div
/    at App (http://localhost:3000/static/js/bundle.js:52:82)

# when it comes to rendering lists of data, React has a special concept that exists
# to ensure that React can update and render these lists efficiantly wihtout performance losses or bugs
NB what happens with is error is the following:
# (look at the HTML strucutre in the developer tools when you add a new item)
# when we add a new item, React renders this new item as the last item in the list of divs
# then updates all items and replaces their content such that it matches the order of our items in our array
This happens because to React all these items look similar
and it only sees that our array changed (that now it is longer than before).
So it simply renders an additional div and adds it at the end.
Then React walks through all the items and updates the content inside of every item to match the Array content again.
The final result is correct but not optimal in terms of performance and it leads to bugs (if the ExpenseItem was a stateful item, the state changes will be lost because the itema are overwritten)

NB we get this warning because we have a way of telling React where an item should be added; so in the Expenses.js file, when you call ExpenseItem, you add a key prop
NB you can always add the key prop (always i.e. to both built-in HTML elements and custom components)
NB with this prop you can help React identify the individual items, and its value should be a unique value (e.g. expense id because in our array every expense item has a unique id)
*/
