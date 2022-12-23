import useInput from "../hooks/use-input";

const isEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const BasicForm = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    clearField: firstNameClear,
  } = useInput(isEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    clearField: lastNameClear,
  } = useInput(isEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearField: emailClear,
  } = useInput(isEmail);

  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) formIsValid = true;

  const submitHandler = (e) => {
    e.preventDefault();

    if (firstNameHasError || lastNameHasError || emailHasError) return;

    console.log(firstNameValue, lastNameValue, emailValue);

    firstNameClear();
    lastNameClear();
    emailClear();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div
          className={
            firstNameHasError ? "form-control invalid" : "form-control"
          }
        >
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">First Name must not be empty.</p>
          )}
        </div>
        <div
          className={lastNameHasError ? "form-control invalid" : "form-control"}
        >
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Last Name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={emailHasError ? "form-control invalid" : "form-control"}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p className="error-text">Email must be valid.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
