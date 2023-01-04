import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

//% NB React Transition Group
// https://reactcommunity.org/react-transition-group/
//https://github.com/reactjs/react-transition-group
import Transition from "react-transition-group/Transition";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false,
  };
  showModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button
          className="Button"
          onClick={() => {
            this.setState((currState) => ({ showBlock: !currState.showBlock }));
          }}
        >
          Toggle
        </button>
        <br />
        <Transition
          in={this.state.showBlock}
          timeout={300}
          mountOnEntern
          unmountOnExit
        >
          {/* {(state) => <p>{state}</p>} */}
          {(state) => (
            <div
              style={{
                backgroundColor: "red",
                width: 100,
                height: 100,
                margin: "auto",
                transition: "opacity 1s ease-out",
                opacity: state === "exiting" ? 0 : 1,
              }}
            ></div>
          )}
        </Transition>

        {/* <Modal show={this.state.modalIsOpen} closed={this.closeModal} />
        <Backdrop show={this.state.modalIsOpen} /> */}

        <Transition
          in={this.state.modalIsOpen}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {(state) => <Modal show={state} closed={this.closeModal} />}
        </Transition>
        {this.state.modalIsOpen ? <Backdrop show /> : null}

        <button className="Button" onClick={this.showModal}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
