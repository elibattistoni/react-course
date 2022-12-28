//% import the Link component from rect-router-dom
//% it allows us to create a link for a FAKE NAVIGATION so that we do NOT SEND REQUESTS, the page is not reloaded, and we do not lose the state!!
//% so you should ALWAYS use this Link component instead of the standard <a></a> tag!!!
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <header>
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
};

export default MainHeader;
