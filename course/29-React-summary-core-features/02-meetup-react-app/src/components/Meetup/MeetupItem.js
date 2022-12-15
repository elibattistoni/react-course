import { useContext } from "react";
import Card from "../UI/Card";
import classes from "./MeetupItem.module.css";
import FavoritesContext from "../../store/favorites-context";

//| Add to favorites functionality
//| when the button "to Favorites" is clicked, we add this MeetupItem to our context
//| + update the button (remove from favorites)

const MeetupItem = (props) => {
  //| the useContext hook allows us to establish a connection between this component and the context
  const favoritesCtx = useContext(FavoritesContext);

  //| find out if this item is already a favorite
  const isFavorite = favoritesCtx.isFavorite(props.id);

  //| create a function that handles the status of the button
  const toggleFavoriteStatusHandler = () => {
    if (isFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        address: props.address,
        image: props.image,
      });
    }
  };

  return (
    <li key={props.id} className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {isFavorite ? "Remove from Favorites" : "To Favorites"}
          </button>
        </div>
      </Card>
    </li>
  );
};

export default MeetupItem;
