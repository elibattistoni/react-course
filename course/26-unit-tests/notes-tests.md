# Automated Testing in React Apps

Automated testing == code that tests other code --> it is used in combination with Manual Testing, not as a replacement

3 main categories of tests:
1. Unit Tests
2. Integration Tests
3. End-to-End (e2e) Tests

## Required Tools and Setup
1. we need a tool for running our tests and asserting the results --> we typically use **Jest** --> it is not the only tool for this, but it is very popular, easy to use
2. we need a tool for "simulating" (rendering) our React app/components (we need a tool to simulate the browser basically) --> we typically use the **React Testing Library**
NB these tools are already set up for you when you work on a project created with "create-react-app"

To run the tests that you write:
`npm test` (script defined in package.json)
it automatically looks for file that end with ".test.js"
NB the convention is to write a test as close as possible to the component/script/file that you want to test