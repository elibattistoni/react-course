import classes from "./Button.module.css";

const Button = (props) => {
  // NB if props.type is undefined (not set when calling the Button component), set a default value of "button"
  // NB forward the click handler function to props.onClick which must be defined when calling the Button component
  return (
    <button
      type={props.type || "button"}
      className={classes.button}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
