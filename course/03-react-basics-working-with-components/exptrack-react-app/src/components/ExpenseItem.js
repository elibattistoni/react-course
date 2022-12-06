// IMPORTANT in React components there is one important rule
/// regarding the JSX code that is returned: you must return only one root element per return statement (or per JSX code snippet)

//==============================================================================
//# CSS styling
//==============================================================================
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
// NB components cannot use data stored in other components
//- but we can use a concept called "props" in React: we can pass data to the custom component
//- by adding an attribute, and inside of that component, we can then get access to all these attributes which might have been set on our custom component
// NB just as HTML elements have attributes, also our custom React components can have attributes and they are called "props" (i.e. properties) instead of attributes
//- we can set properties of our own custom components
// the expenseDate, expenseTitle, expenseAmount should be stored as an array in App.js not in the ExpenseItem
// VERY IMPORTANT props is a very important concept because it allows you to make your components reusable and it allows you to pass data from a component to another

function ExpenseItem(props) {
  //= props is an object that contains all the values of the attributes that we define when we call this custom component
  // the keys are the names of the attributes; the values are the relative values
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className="expense-item">
      <div>
        <div>{month}</div>
        <div>{year}</div>
        <div>{day}</div>
      </div>
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
