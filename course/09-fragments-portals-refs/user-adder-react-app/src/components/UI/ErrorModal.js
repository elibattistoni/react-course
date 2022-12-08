import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

//NB with Backdrop and ModalOverlay you split the modal window into 2 separate components because this makes working with portals much easier
//# React DOM is kind of the adapter for React to the browser
//NB You need the library react-dom to create a portal!

const Backdrop = (props) => {
  // this is for the blurred black screen behind the modal
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  // ReactDOM.createPortal() takes in 2 arguments: 1) the React node that should be rendered; 2) a pointer to the container in the real DOM where this element should be rendered
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

// NB without a PORTAl the error modal is rendered, in the real DOM, next to the Card that contains the form, instead of being rendered in the root div (which should be the best practice)
//# we actually want to have the div with the modal and the div with the overlay as direct children of the body, next to the root div which holds the rest of the application
// NB go to App.js to see the implementation of Portal

export default ErrorModal;
