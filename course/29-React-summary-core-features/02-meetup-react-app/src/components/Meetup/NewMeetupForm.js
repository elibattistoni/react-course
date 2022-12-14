import Card from "../UI/Card";
import classes from "./NewMeetupForm.module.css";

const NewMeetupForm = (props) => {
  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" id="title" required />
        </div>

        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" id="image" required />
        </div>

        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" required />
        </div>

        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea id="description" rows="5" required></textarea>
        </div>

        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
};

export default NewMeetupForm;
