import Greetings from "./Greetings";
import { render, screen } from "@testing-library/react";
import { createRoot } from "react-dom/client";

test("renders hello world", () => {
  //| IMPORTANT we want to write a test following the 3 A
  //| 1. A ==> ARRANGE ==> set up the test data, test conditions, and test environment
  //| 2. A ==> ACT ==> run the logic that should be tested (e.g. execute function)
  //| 3. A ==> ASSERT ==> assert the results, i.e. compare execution results with expected results
  //NB ARRANGE ==> render the greeting component
  render(<Greetings />);

  //NB ACT
  //nothing

  //NB ASSERT
  const helloElement = screen.getByText("Hello World", { exact: true });
  // exact = true is actually the default and you would not need it here
  // getByText returns an element, but if it does not find the element, it will throw an error
  expect(helloElement).toBeInTheDocument();
});
