import { NavLink } from "react-router-dom";

import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            {/* <NavLink activeClassName={classes.active} to='/welcome'>
              Welcome
            </NavLink> */}
            <NavLink
              to="/welcome"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
