import React, { useState } from "react";

import Button from "../../UI/Button/Button";
// import "./CourseInput.css";
import styles from "./CourseInput.module.css";
// import styled from "styled-components";

/*
NB so far we have only defined one component per file, however, it is fine to have more components per file if the "other components" are used only in that file
NB see CourseInput.css to understand how styles are translated
*/
// const FormControl = styled.div`
//   margin: 0.5rem 0;

//   & label {
//     font-weight: bold;
//     display: block;
//     margin-bottom: 0.5rem;
//     color: ${(props) => (props.invalid ? "red" : "black")};
//   }

//   & input {
//     display: block;
//     width: 100%;
//     border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
//     background: 1px solid
//       ${(props) => (props.invalid ? "#ffd7d7" : "transparent")};
//     font: inherit;
//     line-height: 1.5rem;
//     padding: 0 0.25rem;
//   }

//   & input:focus {
//     outline: none;
//     background: #fad0ec;
//     border-color: #8b005d;
//   }
// `;

/*
NB with the method with props.invalid we removed the following from the code above:
in & input {
  border: 1px solid #ccc;
}

&.invalid input {
  border-color: red;
  background-color: #ffd7d7;
}

&.invalid label {
  color: red;
}
*/

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true); // this is for handling whether the input is empty or not

  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // do not let the user add a goal if the goal is empty
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {/* we want to render a div with another component defined in this file (and used only in this file) with the styled components package */}
      {/* <div className={`form-control ${!isValid ? "invalid" : ""}`}> */}
      {/* NB OPTION 1 <FormControl className={!isValid && "invalid"}> */}
      {/* NB OPTION 2 <FormControl invalid={!isValid}> + you need to change the FormControl definition
      so that it changes dynamically the style NB it receives the props NB you can add props to your styled component!
      NB see line 24 border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
      */}
      {/* with styled components: */}
      {/* <FormControl invalid={!isValid}>
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </FormControl> */}
      {/* </div> */}
      {/* with css modules: add dynamic classes */}
      <div
        className={`${styles["form-control"]} ${!isValid && styles.invalid}`}
      >
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
