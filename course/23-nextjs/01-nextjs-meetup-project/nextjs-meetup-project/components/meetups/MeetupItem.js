import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  const router = useRouter();

  const showDetailsHandler = () => {
    // NB here we can navigate away programmatically using the useRouter React Hook
    // NB router.push() is the equivalent of using the Link component if you don't want to use the Link component but instead navigate programmatically
    router.push(`/${props.id}`);
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
          {/* NB here a Link would be better! */}
          {/* but we keep the button so as to learn how to navigate away programmatically */}
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
