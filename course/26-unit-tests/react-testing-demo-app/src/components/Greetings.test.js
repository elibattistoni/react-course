import Greetings from "./Greetings";
import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

//% TESTING SUITE
//| create a testing suite
describe("Greeting component", () => {
  // here you add all your tests, e.g.:

  test("renders hello world", () => {
    render(<Greetings />);
    const helloElement = screen.getByText("Hello World", { exact: true });
    expect(helloElement).toBeInTheDocument();
  });
});
//NB we can have multiple suites, and multiple tests per suite

//% STANDARD UNIT TEST (content on screen)
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

//% UNIT TEST (testing user interaction and state)
test("renders good to see you if button was NOT clicked", () => {
  // arrange
  render(<Greetings />);

  // assert
  const paragraphElement = screen.getByText("good to see you", {
    exact: false,
  });
  expect(paragraphElement).toBeInTheDocument();
});

test("renders changed if button was clicked", () => {
  // arrange
  render(<Greetings />);

  // act (click button)
  const buttonElement = screen.getByRole("button");
  // userEvent.click(buttonElement);
  fireEvent.click(buttonElement);

  // assert
  const paragraphElement = screen.getByText("changed", {
    exact: false,
  });
  expect(paragraphElement).toBeInTheDocument();
});

test("does not render good to see you if button was clicked", () => {
  // arrange
  render(<Greetings />);

  // act (click button)
  const buttonElement = screen.getByRole("button");
  // userEvent.click(buttonElement);
  fireEvent.click(buttonElement);

  // assert
  const paragraphElement = screen.queryByText("good to see you", {
    exact: false,
  });
  expect(paragraphElement).toBeNull();
});
