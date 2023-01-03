import { screen, render } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  /*
  test("renders posts if request succeeds", async () => {
    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem");
    // .getByRole() fails if we have more than one item with that specified role
    // getAllByRole() will instantly look for these elements on the screen, but keep in mind that we are sending an HTTP request which is an async action
    // findAllbyRole instead returns a promise
    //NB so here we are waiting for our data to be rendered

    expect(listItemElements).not.toHaveLength(0);
  });
  */
  //NB the test above is still not ideal because we are sending an HTTP request in Async.js
  //NB but when we run tests, we do not want to send HTTP requests to our servers because:
  //- 1) this will cause a lot of traffic (especially if you have a lot of tests and a lot of requests)
  //- 2) if you have a POST request instead of a GET request, your tests might start inserting data to a database
  //- or start changing things on the server (because you want to test also components and scenarios where those requests are being sent)
  //NB so what we usually do is:
  //- a) we don't send real requests
  //- b) we send real requests to fake servers (testing servers)
  //NB in our case, we don't want to even test this, because we are relaying on the fetch() function that is built in the browser API so we can assume that it is correct
  //NB what we want to test, instead, is whether our component behaves correctly depending on the different outcomes of sendind a request
  //NB so we actually want to check whether our component behaves correctly once we get the response data, and we also want to check whether our component behaves correctly if we get an error
  //NB but we don't want to check whetehr technically sending this request succeeds
  //NB therefore we want to replace the fetch function (that is built into the browser) with a so called mock function, i.e. a dummy function that overrides the builtin function
  //NB a dummy function that does not send a real request and does what we want
  //NB so then when our component executes during testing, we use that dummy/mock function, instead od the real built-in function:
  test("renders posts if request succeeds", async () => {
    //NB we create a mock function in this way (we override the builtin function with our mock function)
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "First post" }],
    });
    // here we have set the actual value the promise should return
    // so in this way we are simulating the success case and we are note sending a request to the API

    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem");

    expect(listItemElements).not.toHaveLength(0);
  });
});
