import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  // handler function that should be executed when the for is submitted (i.e. onSubmit)
  const addUserHandler = (event) => {
    event.preventDefault();
    console.log("form submitted!");
  };

  return (
    <Card className={classes.input}>
      {/* NB remember that on CUSTOM COMPONENTS we do not have a default className property, it is treated as a key of the props object */}
      {/* therefore when defining the Card component in Card.js you have to make sure that it can receive classes from props.className */}
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="age">Age (Years)</label>
        <input type="number" id="age" />
        <Button type="submit">Add User</Button>
        {/* <button type="submit">Add User</button> */}
      </form>
    </Card>
  );
};

/*
IMPORTANT notice that since "for" is a reserved word in Javascript, when you need
/ to write a label element for a specific input, instead of referring it with for, you use htmlFor
*/

export default AddUser;
