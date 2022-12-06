//==============================================================================
//# INTRODUCTION
//==============================================================================
/*
This file contains a function, and then we export this function

NB this code works because we are using React (it would not work with regular JS) and it is a feature called JSX

NB JSX code = HTML code inside JavaScript; JSX = Javascript XML (because HTML in the end s XML)

NB this only works because there are transformation steps running behind the scenes because the npm start process transformed this JSX code to a more browser friendly code before everything is served
you can see the transformed code in the developer tools in your browser, in the tab Sources, in the folder static/js there is all the transformed code
this code does not contain our source code but the whole React library source code and the whole React DOM library source code
*/

//==============================================================================
//# Import Custom Components
//==============================================================================
import ExpenseItem from "./components/ExpenseItem"; // NB once imported, you can use it just like an HTML element!
// the key difference between the HTML of custom components and the HTML of regular elements is that the Custom Component HTML starts with uppercase letter so that react can detect that it is a custom component
// NB the rule that React applies: lowercase elements == built-in HTML elements; uppercase elements == custom React Components

function App() {
  const expenses = [
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

  return (
    <div>
      <h2>Let's get started!</h2>
      //= props for sharing data between components
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
      ></ExpenseItem>
      <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        date={expenses[1].date}
      ></ExpenseItem>
      <ExpenseItem
        title={expenses[2].title}
        amount={expenses[2].amount}
        date={expenses[2].date}
      ></ExpenseItem>
    </div>
  );
}

export default App;
