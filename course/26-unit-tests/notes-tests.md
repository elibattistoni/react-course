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

# Testing suites
as your app grows, you might have dozens, hundreds or even thousands of tests --> you therefore organize them into different **test suites** --> e.g. all tests belonging to one feature or one component of your app, can be grouped together into one testing suite.
How do you create a testing suite? by ousing the global "describe" function (see Greetings.test.js)

## user-event library
Things changed in userEvent v14

So while writing tests along with Max, my 'renders Changed if the button was clicked' test kept failing. Upon reading some documentation, I realized that userEvent.click() is now async. So there're 2 possible solutions for that.

The async/await solution:

    test('renders Changed if the button was clicked', async () => {
        // Arrange
        render(<Greeting />)
     
        // Act
        const buttonElement = screen.getByRole('button')
        await userEvent.click(buttonElement)
     
        // Assert
        const outputElement = screen.getByText('Changed!', { exact: false })
        expect(outputElement).toBeInTheDocument()
    })

The sync solution:

    import { fireEvent, render, screen } from '@testing-library/react' // <- notice that fireEvent import
     
    test('renders Changed if the button was clicked', () => {
        // Arrange
        render(<Greeting />)
     
        // Act
        const buttonElement = screen.getByRole('button')
        fireEvent.click(buttonElement)
     
        // Assert
        const outputElement = screen.getByText('Changed!', { exact: false })
        expect(outputElement).toBeInTheDocument()
    })

For me the sync test was on average about 0.5-1 second faster.

Cheers!

## Available HTML roles that you can use for .getByRole()
https://www.w3.org/TR/html-aria/#docconformance

# Further resources
- JEST --> https://jestjs.io/
- React Testing Library --> https://testing-library.com/docs/react-testing-library/intro/
- React Hook Testing Library --> https://react-hooks-testing-library.com/