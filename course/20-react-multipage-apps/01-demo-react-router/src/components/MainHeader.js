//% import the Link component from rect-router-dom
//NB Link Component:
//- it allows us to create a link for a FAKE NAVIGATION so that we do NOT SEND REQUESTS, the page is not reloaded, and we do not lose the state!!
//- so you should ALWAYS use this Link component instead of the standard <a></a> tag!!!

//% alternatively, you can use the NavLink component, which has some nice extra features (e.g. making it clear which page you are on)
//NB NavLink component
//- it has the same features of the Link component, but it also sets a CSS class
//- on the active anchor item (we just need to tell NavLink which class to add, through the activeClassName prop)
//NB to have this feature, you also have to define in the css the ".header a.active" style
import { Link, NavLink } from "react-router-dom";

import classes from "./MainHeader.module.css";

const MainHeader = () => {
  //% this is with the Link component of react-router-dom
  const contentHeaderLink = (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to="/welcome">Welcome</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );

  //% this is with the NavLink component of react-router-dom
  const contentHeaderNavLink = (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink to="/welcome" activeClassName={classes.active}>
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" activeClassName={classes.active}>
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
  return contentHeaderNavLink;
};

export default MainHeader;
