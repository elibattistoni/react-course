import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import MeetupList from "../components/Meetup/MeetupList";

const FavoritesPage = (props) => {
  const favoritesCtx = useContext(FavoritesContext);

  let content;
  if (favoritesCtx.totalFavorites === 0) {
    content = <p>No Favorite Meetups present. Add some! :)</p>;
  } else {
    content = <MeetupList meetups={favoritesCtx.favorites} />;
  }

  return (
    <section>
      <h1>Favorite Meetups Page</h1>
      {content}
    </section>
  );
};

export default FavoritesPage;
