import React, { useCallback, useState } from "react";

import Button from "./components/UI/Button/Button";
import DemoOutput from "./components/Demo/DemoOutput";
import "./App.css";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log("APP RUNNING");

  const toggleParagraphHandler = useCallback(() => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  }, []);
  // NB like with useEffect, we have to specify an array of dependencies as a second argument
  // NB no dependencies === this function will never change, therefore always the same function
  //- object should be reused when the app component re-renders **

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false} />
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}

export default App;

/*
NB (**) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
in JS functions are closures, i.e. they close over the values that are available in their environment at the moment of the creation
NB you need to understand closures to understand fully how React works!!
*/
