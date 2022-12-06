- the React code is in the src/ folder;
- in the starting material of the project we have 2 js and one css files
- IMPORTANT always: the **index.js** file is the first code file that will be executed when the page is loaded
- NB it is not exactly that code but a **transformed version of that code**: remember that our project setup involves some scripts that transform and optimize the code behind the scenes: we write the code in a easier-to-read developer-friendly way with some syntactic sugar, which makes our life as developer easier, but this code does not run like this in the browser (and especially not in all supported browsers): the **npm start** process will not just watch our code and then take it and deliver it to the browser, but before it delivers it, it will **transform** it so that certain extra features work in the browser (if you take this code and not transform it, it would not work). e.g. the code `import './index.css'` would not work if we used regular Javascript (**you cannot import css into JS**) same goes for the html code in JS
- in *package.json* in the dependencies there are 2 react libraries:
        "react": "^18.0.0"
        "react-dom": "^18.0.0"
    these two dependencies work together to form the React library