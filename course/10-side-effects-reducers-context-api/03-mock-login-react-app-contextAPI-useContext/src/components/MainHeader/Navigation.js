import React, { useContext } from "react";
import classes from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";

// NB useContext is a React Hook that allows us to tap into a Context and listen to it

const Navigation = () => {
  // NB with useContext
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
