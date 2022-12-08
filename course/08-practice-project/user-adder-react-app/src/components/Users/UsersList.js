import classes from "./UsersList.module.css";
import Card from "../UI/Card";

const UsersList = (props) => {
  let contentCard;

  if (props.users.length === 0) {
    contentCard = <h3 className={classes.fallback}>No users found</h3>;
  } else {
    const listItems = props.users.map((user) => (
      <li key={user.id}>
        {user.name} ({user.age} years old)
      </li>
    ));
    contentCard = <ul>{listItems}</ul>;
  }

  return <Card className={classes.users}>{contentCard}</Card>;
};

export default UsersList;
