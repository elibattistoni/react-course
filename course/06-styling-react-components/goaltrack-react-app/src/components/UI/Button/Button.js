// import styled from "styled-components";

// NB the code below was written just becuase we wanted to have some default styling for a button
// import "./Button.css";
// const Button = props => {
//   return (
//     <button type={props.type} className="button" onClick={props.onClick}>
//       {props.children}
//     </button>
//   );
// };
// NB there is nothing wrong about this approach but here we could also use the styled components package to achieve this in an easier way
// what we store in the Button component is not a functional component
/// styled components:
// const Button = styled.button``; // this is called TAGGED TEMPLATE LITERAL (Javascript feature) https://wesbos.com/tagged-template-literals
// NB .button is a method on the styled object (and styled is an object that we are importing from style components)
// this is executed as a method behind the scenes, and what you pass among the `` is passed into this method in a special way
//NB the button method will return a button component; NB the styled package has methods for all HTML elements
// and you write the style between the `` and for pesudo selectors you add a &
// NB commenting Button styled component because we are doing it noe with CSS Modules (which allows to keep separation between css and Javascript)
// const Button = styled.button`
//   width: 100%;
//   font: inherit;
//   padding: 0.5rem 1.5rem;
//   border: 1px solid #8b005d;
//   color: white;
//   background: #8b005d;
//   box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
//   cursor: pointer;

//   @media (min-width: 768px) {
//     width: auto;
//   }

//   &:focus {
//     outline: none;
//   }

//   &:hover,
//   &:active {
//     background: #ac0e77;
//     border-color: #ac0e77;
//     box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
//   }
// `;
// NB get rid of the selectors (see Button.css to understand)
// this returns a button with these styles
//NB the button that is returned also applies by default all the props that you might be passing to your Button component which in the end we export
//IMPORTANT if you inspect the HTMl you will see that the button will have a strange class: this class is generated automatically (dynamically) by the Styled Components package and it ensures (since it has a weird name)
/// that every class name is unique so that it cannot spill over to other components of the app and then it will add these classes as global CSS

import React from "react";
import styles from "./Button.module.css"; //NB particular import: this is how you should import css if you want to use css modules, and you need to rename your file with Button.module.css
/// this is basically a signal to the underlying compilation process to transform the code so that CSS Modules work
const Button = (props) => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {/* NB IMPORTANT see className={styles.button} */}
      {props.children}
    </button>
  );
};

/*
NB what the build process does under the hood is that it takes those CSS classes and CSS files and basically changes those class names to be unique
/ this CSS module concept ensures that the CSS styles that we set up in the CSS file are scoped to the component we import this file into.
/ in the CSS we need to work with classes because we then access those classes as properties on the imported styles object
*/
export default Button;
