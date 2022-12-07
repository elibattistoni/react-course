import styled from "styled-components";

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
const Button = styled.button`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover,
  &:active {
    background: #ac0e77;
    border-color: #ac0e77;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
  }
`;
// NB get rid of the selectors (see Button.css to understand)
// this returns a button with these styles
//NB the button that is returned also applies by default all the props that you might be passing to your Button component which in the end we export
//IMPORTANT if you inspect the HTMl you will see that the button will have a strange class: this class is generated automatically (dynamically) by the Styled Components package and it ensures (since it has a weird name)
/// that every class name is unique so that it cannot spill over to other components of the app and then it will add these classes as global CSS

export default Button;
