import { Fragment, useRef, useState } from "react";
import { Prompt } from "react-router-dom";
//| Prompt is a component that we can render, and this component will automatically watch if we navigate away
//| and if a certain condition is met, it will show a warning before it allows us to leave

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

//% PROMPT: "DO YOU REALLY WANT TO NAVIGATE AWAY?" if accidentally the user clicks
//% on back and tries to leave the page after they have started entereing something in the form
//| 1. determine when the user starts working on the form: when the form gains focus
//| 2. we want to show a warning to the user if they try to leave the page after starting to work on the form

const QuoteForm = (props) => {
  const [isFormFocused, setIsFormFocused] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const formFocusHandler = () => {
    //| this function is needed to determine when the user starts working on the form
    console.log("FOCUS!");
    setIsFormFocused(true);
  };

  const formCompletedHandler = () => {
    setIsFormFocused(false);
  };

  return (
    <Fragment>
      {/*
        Prompt needs 2 props:
        1) when: true or false --> to set whether this prompt should be shown if the user changes the URL or not
        2) message: a function that returns a message (an the input argument is the location i.e. the page you want to go to)
      */}
      <Prompt
        when={isFormFocused}
        message={(location) =>
          "Are you sure you want to leave? All the entered data will be lost"
        }
      />

      <Card>
        <form
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn" onClick={formCompletedHandler}>
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
