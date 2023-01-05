//| this will be our root page
//| so if a request reaches our domain / nothing, then just index.js will be loaded
//| the "index" name is a special name, and it is served whenever we have a request to just /
import { Fragment } from "react";
import Link from "next/link";
//| NB the Link component allows you to maintain the "single page app"
//| because with the anchor element, you woul go to a new page by sending an HTTP request to get back a new html file (which means that we don't have a single page app)
//| this special Link component renders an anchor tag but it watches clicks on those anchor tags and if you click there,
//| it prevents the browser default of sending a request, at getting a new HTML page.
//| Instead, it will load the to be loaded component for you
//| and change the URL so that it looks like you changed the page whilst in reality, you stay in that single page application.
//| And hence, for site internal links in a NextJS application, you wanna use the Link component instead of the anchor tag component

const HomePage = (props) => {
  return (
    <Fragment>
      <h1>The Home Page</h1>
      <ul>
        <li>
          <Link href="news/1">NextJS is a great Framework</Link>
        </li>
        <li>
          <Link href="news/2">Something else</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default HomePage;
