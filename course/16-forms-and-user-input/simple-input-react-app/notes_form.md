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

NB cfr SimpleInput.js!!

## IMPORTANT STEP 2: FORM VALIDATION