// IMPORTANT in React components there is one important rule
/// regarding the JSX code that is returned: you must return only one root element per return statement (or per JSX code snippet)

//==============================================================================
//# CSS styling
//==============================================================================
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css"; // this simply tells the build process that this CSS file should be considered
// NB in JSX you don't write class="" like in regular css but instead write className="" (because the wor class is a reserved work in JavaScript)

//==============================================================================
//# Inserting Dynamic content into JSX with {}
//==============================================================================
/// we typically do have JS code in our components
/// in the JSX you wrap these variables inside {} inside which you can also run basic JS expressions
// it could be any kind of code (e.g. HTTP request to fetch data deom a database to validate user input)

//==============================================================================
//# Making our components reusable by using parameters and "props"
//==============================================================================
/*
NB components cannot use data stored in other components
- but we can use a concept called "props" in React: we can pass data to the custom component
- by adding an attribute, and inside of that component, we can then get access to all these attributes which might have been set on our custom component
NB just as HTML elements have attributes, also our custom React components can have attributes and they are called "props" (i.e. properties) instead of attributes
- we can set properties of our own custom components
the expenseDate, expenseTitle, expenseAmount should be stored as an array in App.js not in the ExpenseItem
VERY IMPORTANT props is a very important concept because it allows you to make your components reusable and it allows you to pass data from a component to another
*/
//==============================================================================
//# Splitting components
//==============================================================================
/*
The components tend to become bigger and bigger as you have more and more logic and JSX in them
this is why react has this component concept: this allows you yo split your app into smaller building blocks,
where every building block (every component) is focused on one core task
and then you build your user interface by combining these building blocks
by doing this you can keep every component on its own, relatively small and manageable, and you can still build complex user interfaces
so we will isolate a component that renders the date in a calendar look --> ExpenseDate.js
*/

function ExpenseItem(props) {
  //= props is an object that contains all the values of the attributes that we define when we call this custom component
  // the keys are the names of the attributes; the values are the relative values
  /// component isolated in ExpenseDate.js
  // const month = props.date.toLocaleString("en-US", { month: "long" });
  // const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  // const year = props.date.getFullYear();
  //NB if a component does not have anything between the opening and closing tag, you can write a single self closing tag
  // i.e. <ExpenseDate date={props.date}></ExpenseDate> becomes <ExpenseDate date={props.date} />

  return (
    <div className="expense-item">
      <ExpenseDate date={props.date} />

      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
