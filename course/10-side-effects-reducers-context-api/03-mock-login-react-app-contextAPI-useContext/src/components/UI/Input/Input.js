import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

/*
the useImperativeHandle hook is a hook that allows us to use this component
or fuctionalities from inside this component imperatively, i.e. not through the regular
state props management (i.e. not by controlling the component through state in the parent component)
but instead by directly calling or manipulating something in the component programmatically
//NB you should not use this features in your projects very often, you might want to find alternatives
but in this case, this is a pretty nice solution for this problem

IMPORTANT
with useImperativeHandler and forwardRef, you can expose functionalities from a React Component to its parent Component
/ to then use your Component in the parent component through refs, and trigger certain functionalities
BEST PRACTICE avoid it at all costs (but in cases with focus and scrolling this can be useful)
*/

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focusOnField: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
