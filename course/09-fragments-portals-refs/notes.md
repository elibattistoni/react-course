# JSX Limitations and workarounds

In React we work with JSX all the time: JSX is that code that you return in your Components and that will be rendered to the real DOM by React. However, JSX has certain limitations.
For example, **you cannot return two adjacent root level JSX elements** ("root level" = we have 2 JSX elements next to each other not wrapped by another JSX element and we try to return these side by side JSX elements or we try to store them in variables).

#### LIMITATION n° 1: You cannot return more than one root JSX element (and you cannot store more than one root element in a variable). Why? because, like in JavaScript, you cannot return more than one item (object/array/number/string)
    - SOLUTION N° 1: like we already did, by wrapping the adjacent element with a div (NB you can use any built-in HTML component or any custom component, the important thing is that it is only one JSX element).
    - SOLUTION N°2: use [] instead of a div, i.e. instead of the div you could use a native JavaScript array, with the adjacent JSX elements separated by commas. However you will get a warning: with React, every time you are working with a list or array of JSX elements, React wants the key prop on every element so that it can understand how to place them

Solution n°1 is the BEST PRACTICE but this leads to another proble: **DIV SOUP**: we can end up with a complex rendered DOM, where you have many nested React components with unnecessary divs wrapping Components just because of this JSX limitation. **In bigger apps, you can easily end up with tons of unnecessary <div>s or other elements which add no semantic meaning or structure to the page but are only there because of React's/JSX's requirement** and NB this could break your styling!! e.g. if you have nested CSS selectors + NB it is not good practice: you are rendering too many HTML elements and ultimately this also makes your application slower, because the browser needs to render all those elements, and React needs to monitor all those elements (or at least some of them) if content needs to change. Therefore **the wrapping div/element approach is ok but not ideal**.

## FINAL SOLUTION: Wrapper Component (this prevents div soup)
In the "/components" folder you add a new folder names "Helpers" and in this folder you add a "Wrapper.js" file/component and this will be the Wrapper component:

```
const Wrapper = (props) => {
    return props.children
}

export default Wrapper;
```
This returns only props.children: **props.children holds all the content you are passing between the opening and closing tag of your custom component**. Then you can import it when you need the wrapping div and replace the div with Wrapper
IMPORTANT THIS WRAPPER COMPONENT WILL NOT BE RENDERED IN THE DOM!!!!

NB This Wrapper component is actually not a component that we need to build on our own, it comes with React and it is called **Fragment Component**
You can use:
`<Fragment>...</Fragment>` (this syntax always work)
or
`<>...</>` (this shortcut depends on the project setup because the workflow needs to support this)

The Wrapper component was simply done jsut to understand what these builtin wrappers do.

# React Portals
**Fragments** allow us to write cleaner code, to end up with less unnecessary HTML elements on the final page. **React portals** are another useful feature, which also help us write cleaner code.

NB when you have a modal, the best practice is to not have them nested into somthing, because in the end a modal is an overlay to the entire page, so logically, it is above everything else. And if it is nested in some other HTML code, it might technically work because of CSS styling **but it is not good code, it's not good structure**; in addition, it can lead to real problems with styling or accessibility (e.g. a screen reader might not see it as a overlay) and you would have similar problems for side drawers, dialogues, for all kinds of overlays or any related component.
We can use another React feature to get rid of the problem with the overlay/modal that should not be deeply nested: we can use a *portal* to keep the structure we want to have / to keep writing components the way we want to write them, and render this differently in the real DOM (e.g. rendering the modal HTML content somewhere else than it would normally go if there was no transofrmation from the HTML that we defined).