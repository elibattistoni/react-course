import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
      {/* NB through props.input you add all your input configuration when
      you call this Input component by defining them in the input prop */}
    </div>
  );
});

export default Input;
