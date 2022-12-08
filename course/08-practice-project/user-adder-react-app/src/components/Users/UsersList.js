import classes from "./UsersList.module.css";
import Card from "../UI/Card";

const UsersList = (props) => {
  const listItems = props.users.map((user) => (
    <li>
      {user.name} ({user.age} years old)
    </li>
  ));

  return (
    <Card className={classes.users}>
      <ul>{listItems}</ul>
    </Card>
  );
};

export default UsersList;
