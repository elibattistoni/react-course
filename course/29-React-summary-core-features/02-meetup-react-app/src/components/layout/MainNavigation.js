/*
IMPORTANT a not on links
usually in standard HTML we typically render links with the anchor tag
however, here this have a big disadvantage: if we use an anchor tag, whenever we
click on it, a new request will be sent to the server
the server is the server hosting this react app ==> and this server would then reply with our application and the router would figure out which page to load
so this link with the achor tag would work, but we would send a request first, which is redundant
We already are in our running React application, and it would be great if we don't leave it just because we wanna navigate somewhere.
Hence sending that extra request is not something we necessarily wanna do.

Instead we use another component provided by the react-router-dom package, the Link component
which eventually will render an anchor tag, but internally, react-router-dom attaches
a click listener and when you click on it, it will prevent the browser to sending a request by default:
it will just parde the URL you want to go to and change it in the broser bar, not send the request, and load the appropriate component on the screen just with React and JS
the to prop sets the path of the page that we want to go to
*/

import { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import FavoritesContext from "../../store/favorites-context";

const MainNavigation = (props) => {
  const favoritesCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Page Logo here</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Meetups</Link>
          </li>
          <li>
            <Link to="/new-meetup">Add New Meetup</Link>
          </li>
          <li>
            <Link to="/favorites">
              My Favourites
              <span className={classes.badge}>
                {favoritesCtx.totalFavorites}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
