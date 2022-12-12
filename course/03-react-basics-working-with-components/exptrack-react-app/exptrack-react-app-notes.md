- the React code is in the src/ folder;
- in the starting material of the project we have 2 js and one css files
- IMPORTANT always: the **index.js** file is the first code file that will be executed when the page is loaded
- NB it is not exactly that code but a **transformed version of that code**: remember that our project setup involves some scripts that transform and optimize the code behind the scenes: we write the code in a easier-to-read developer-friendly way with some syntactic sugar, which makes our life as developer easier, but this code does not run like this in the browser (and especially not in all supported browsers): the **npm start** process will not just watch our code and then take it and deliver it to the browser, but before it delivers it, it will **transform** it so that certain extra features work in the browser (if you take this code and not transform it, it would not work). e.g. the code `import './index.css'` would not work if we used regular Javascript (**you cannot import css into JS**) same goes for the html code in JS
- in *package.json* in the dependencies there are 2 react libraries:
        "react": "^18.0.0"
        "react-dom": "^18.0.0"
    these two dependencies work together to form the React library
- see the files *index.js* and *App.js* for notes
- IMPORTANT BEST PRACTICE write new components in new files (this means that in a React project you will end up with dozens or hundreds of files because on React project you will have dozens or hundreds of Components -- but this is normal); to organize the files a bit, in the src/ folder add a components/ folder which will hold all the components source files (IMPORTANT we do not move App.js because it is a special Component in terms of its role in the application -- it is our **root component** i.e. the main Component being rendered in the starting file index.js) and all other components will be either nested inside of App.js or nested inside other components -- NB ultimately with React we build a **COMPONENT TREE**
- inside the /components folder add a new file named ExpenseItem.js (NB naming convention: first letter is uppercase + CamelCase)
- NB IMPORTANT how is a Component written in React? It is just a function: **a React Component is just a JavaScript function**, **a special kind of function because it returns JSX code, but it is just a JavaScript function**. NB to style the component, **add a css file for each component in the same folder of the component**


## Other notes

The approach of building a user interface from smaller building blocks is called **COMPOSITION**.
Interesting aspect about composition: what if we want to create a component that serves as a shell around any kind of other content? At the moment we have highly specific components: ExpenseDate component, ExpenseItem component, Expenses component. In your React app you will always have a lot of these very specific components, and all these components are just configured through props. This is fairly standard.
Somtimes however you want to have a component where you don't configure everything through props, but where instead you are able to pass content between the opening and closing tags of that component. At the moment we have some duplication: Expenses has a div which surrounds the individual expenses and which applies a certain style, and the same is true for ExpenseItem; not all the divs have the same look (e.g. inside ExpenseItem we have divs that have a completely different look). IMPORTANT we could extract the surrounding container div which we have in both Expenses and ExpenseItem, extract the styles that they have in common (e.g. rounded corners and drop shadow) into a separate component. And we could name this component **Card** because it has a specific card look: NB in general, in web development, the term "card" usually refers to some kind of container look with rounded corners, drop shadow, and so on.
The **props.children** feature allows you to create wrapper components which is a special kind of component that you sometimes need.

## Organizing further the components/ folder
Best to group components: "components/UI" folder for general user interface elements; "components/Expenses/" for dealing with expenses and expense data

# React props: practical guide
https://dmitripavlutin.com/react-props/
