import classes from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../store";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatchFunction = useDispatch();
  const logoutHandler = () => {
    dispatchFunction(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuth && (
        <nav>
          <ul>
            <li>
              <a href="/">My Products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
