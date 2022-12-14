import { useRef } from "react";
import Card from "../UI/Card";
import classes from "./NewMeetupForm.module.css";

const NewMeetupForm = (props) => {
  const titleReference = useRef();
  const imageReference = useRef();
  const addressReference = useRef();
  const descriptionReference = useRef();

  // function that handles form submission
  const submitHandler = (e) => {
    e.preventDefault();
    // get data with refs
    const data = {
      title: titleReference.current.value,
      image: imageReference.current.value,
      address: addressReference.current.value,
      description: descriptionReference.current.value,
    };
    console.log(data);
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
