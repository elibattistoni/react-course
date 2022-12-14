import { useRef } from "react";
import Card from "../UI/Card";
import classes from "./NewMeetupForm.module.css";

const NewMeetupForm = (props) => {
  // set references for getting data once the user submits the form
  const titleReference = useRef();
  const imageReference = useRef();
  const addressReference = useRef();
  const descriptionReference = useRef();

  // function that handles form submission
  const submitHandler = (e) => {
    // prevent default (i.e. sending HTTP request + reloading page)
    e.preventDefault();

    // get data with refs
    const meetupData = {
      title: titleReference.current.value,
      image: imageReference.current.value,
      address: addressReference.current.value,
      description: descriptionReference.current.value,
    };
    console.log(meetupData);
    // we don't want to log the results to the console, but we want to send it
    // to a server for storing it into a db --> but we will do it in the NewMeetup component
    // because we want to handle the functionality of sending HTTP requests there (since this component is already very big)

    // call the function that stores the data (from the NewMeetup component)
    props.onAddMeetup(meetupData);
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" id="title" required ref={titleReference} />
        </div>

        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" id="image" required ref={imageReference} />
        </div>

        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" required ref={addressReference} />
        </div>

        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="5"
            required
            ref={descriptionReference}
          />
        </div>

        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
};

export default NewMeetupForm;
