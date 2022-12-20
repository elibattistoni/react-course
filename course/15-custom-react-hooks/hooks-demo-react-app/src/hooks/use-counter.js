import { useState, useEffect } from "react";

const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) =>
        forwards ? prevCounter + 1 : prevCounter - 1
      );
      // the teacher did the operation above in this way:
      // if (forwards) {
      //   setCounter((prevCounter) => prevCounter + 1);
      // } else {
      //   setCounter((prevCounter) => prevCounter - 1);
      // }
      // or:
      // if (forwards) setCounter((prevCounter) => prevCounter + 1);
      // else setCounter((prevCounter) => prevCounter - 1);
      //
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  // NB in your custom hooks you can return whatever you want
  return counter;
};

export default useCounter;
