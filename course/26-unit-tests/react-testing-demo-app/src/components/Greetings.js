import { useState } from "react";
import Output from "./Output";

const Greetings = (props) => {
  const [changedText, setChangedText] = useState(false);

  const changeTextHandler = () => {
    setChangedText(true);
  };

  return (
    <div>
      <h2>Hello World</h2>
      {/* uncomment below to see it work -- but then comment the other two lines */}
      {/* {!changedText && <p>It's good to see you</p>}
      {changedText && <p>Changed!</p>} */}
      {/* this now becomes kind of an integration test */}
      {!changedText && <Output>It's good to see you</Output>}
      {changedText && <Output>Changed!</Output>}
      <button onClick={changeTextHandler}>Change Text!!</button>
    </div>
  );
};

export default Greetings;
