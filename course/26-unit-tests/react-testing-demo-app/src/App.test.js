import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  //NB this is the code that will be executed once we run our test
  render(<App />);

  const linkElement = screen.getByText(/learn react/i);
  //screen.getByText(/learn react/i); --> this is to get hold of some elements on the virtual screen / simulated browser into which the app is rendered
  // and we identify an element by the text that is rendered inside of it

  // check if that element is in the document:
  expect(linkElement).toBeInTheDocument();
});
//| this test will fail if the element is not found, and it will succeed if the element is found
