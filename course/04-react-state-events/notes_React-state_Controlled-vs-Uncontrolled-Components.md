# React State & Working with Events

- Handling events
- Updating the UI & Working with "state"
- A closer look at components & state

## Concept of "STATE"
Static applications = when the state never changes

You want to have applications that are interactive, so that you can react to clicks by the user and to data being entered by the user and which are reactive, so that the application also changes when certain things happen.

## Continuing with the application: Adding form inputs
- create a new folder in the components folder, names "NewExpense" which will contain the components about gathering the input for a new expense

# Terminology
### Controlled component
see definition in Expenses.js

### Presentational components (or stateless components or dump components) versus stateful components (or smart components)
In all React apps you will have some components that manage some state (e.g. Expenses component which manages the ExpensesFilter state) or the ExpenseForm component (which manages the input state); then you have other components that don't manage any state, (e.g. ExpenseItem) that do not have any internal state, they are just there to output some data. Usually you will have more presentational/stateless/dumb components than stateful/smart components.