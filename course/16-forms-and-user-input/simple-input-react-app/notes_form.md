# What is so complex about forms?
--> forms and their inputs can assume a broad variety of different states (e.g. one or more inputs could be valid or invalid)

Rules:
1. validate when input loses focus
2. if input invalid and then the user comes to change it, check validity on every keystroke


## IMPORTANT STEP 1: FETCHING THE ENTERED VALUE
There are two ways in which you can fetch the entered value:
1. Listen on **every keystroke**, and store the value in some state variable; or
2. Use a **ref** to fetch the input once the user is done typing a value
In reality you use one of these two methods, not both together (in SimpleInput.js they are both shown but it is only for learning purposes)

NB cfr **SimpleInput_validation-on-submit.js**!!

## IMPORTANT STEP 2: FORM VALIDATION
Client-side validation (i.e. front-end validation, where we validate in the browser) is great for user experience because you give the user a dirct feedback, but you should always also validate the input on the server (i.e. implement server-side validation) because the client-side code can be edited by the users (anyone can dive into the source code and change the raw JS code).
So the front-end validation is not a security mechanism, it is simply a tool for achieving a good user experience. Read this: https://academind.com/tutorials/hide-javascript-code .

## VALIDATE WHEN LOSING FOCUS



# SUMMARY:
1. Validate when input loses focus and on form submission
2. If not valid, then when the user starts typing, validate on every keystroke (we want to give the user immediate, direct feedback on every keystroke when it comes to fixing the value)