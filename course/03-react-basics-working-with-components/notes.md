# React Basics & Working with Components

React = JS library for building user interfaces; it makes building complex, interactive, and reactive user interfaces, EASIER

React is all about "Components"

All user interfaces in the end are made up of components

Components = re-usable building blocks in your UI; they are just a combination of HTML, CSS and Javascript (and you don't have to re-use a component to make it a component; the re-usability is one trait)

We have many many individual building blocks that we combine together to build a user interface


Think React components and their reusability a bit like functions calling other functions

## Declarative way

IMPORTANT A component is built in a DECLARATIVE WAY: you do not tell React that a certain HTML element should be created and inserted in a specific place on the user interface (as you would do with vanilla Javascript); instead, with React you always define the desired end state (or target state) -- or also multiple target states depending on different conditions -- and then React figures out which elements have to be added/removed/updated on the current webpage, and you do not write these concrete DOM updating instructions on your own (as you would do with just JS): **with React and React components, you only define the end state(s) and under which condition which state should be used, and then React will do the rest under the hood**.

# Get started

1. **create-react-app**: tool that you can use to create React projects (i.e. pre-configured folder with some basic React code files and a bunch of configuration files that help you build the React App for production use + this gives you a nice dev ; NB you need NodeJS for the create-react-app tool)

https://github.com/facebook/create-react-app --- https://create-react-app.dev/ (full documentation)

execute the commands to create a react application, from this folder:
~/elisa/github-react-course/react-course/course/03-react-basics-working-with-components$

$ npx create-react-app try-create-app
$ cd try-create-app
$ npm start

This was just a demonstration of how to create a React App. The starting material of the preoject app "exptrack-react-app" is the teacher code.