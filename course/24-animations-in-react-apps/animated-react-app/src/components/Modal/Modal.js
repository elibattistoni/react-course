import React from "react";
import Transition from "react-transition-group/Transition";

import "./Modal.css";

const animationTiming = {
  enter: 400,
  exit: 1000,
};

//% with the Transition component

const modal1 = (props) => {
  // const cssClasses = ["Modal", props.show ? "ModalOpen" : "ModalClosed"];
  return (
    <Transition
      in={props.show}
      timeout={animationTiming}
      mountOnEnter
      unmountOnExit
    >
      {/* the timeout (ms) determine how long the entering and exiting state should be held */}
      {(state) => {
        const cssClasses = [
          "Modal",
          state === "entering"
            ? "ModalOpen"
            : state === "exiting"
            ? "ModalClosed"
            : null,
        ];
        return (
          <div className={cssClasses.join(" ")}>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>
              Dismiss
            </button>
          </div>
        );
      }}
    </Transition>
  );
};

//% with the CSSTransition component
import CSSTransition from "react-transition-group/CSSTransition";

const modal2 = (props) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      classNames={{
        enter: "",
        enterActive: "ModalOpen",
        exit: "",
        exitActive: "ModalClosed",
      }}
    >
      <div className="Modal">
        <h1>A Modal</h1>
        <button className="Button" onClick={props.closed}>
          Dismiss
        </button>
      </div>
    </CSSTransition>
  );
};

export default modal1;
