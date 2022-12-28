import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

//% useHistory
//| this hook allows us to change the page history, and therefore the URL
//| and we can use this hook (and the history object it returns) to add QUERY PARAMETERS to the currently loaded page
//| --> useHistory gives us access to the history object, which allows us to change and manage the URL
//% useLocation
//| this hook allows us to read query parameter values
//| --> useLocation gives us access to a location object which holds information about the currently loaded URL

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  //NB this component function will be re-executed whenever we change the query parameters by clicking on the button

  //% sorting functionality (that remains in the url with ?)
  const history = useHistory();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); //NB this is a constructor function built-in in the browser
  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    //| 1. update the URL with ?ascending so that we can share the URL with sotred data
    //| remember that here we user ?sort= .. but sort is not mandatory, it can be another value
    //| sort will be the key that holds our sorting information
    //| and we will set a dynamic value that we derive from our current state of order
    //| important react router allows us to use an alternative description of the
    //| destination a link should lead to or where programmatic navigation should lead to
    //| you can also pass an object that describes the target destination
    //| so if you have more complex URLs you want to navigate to
    // React Router: different ways to specify paths
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
    /*
    ALTERNATIVE 2
    history.push(
      `${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`
    );
    */

    //| 2. we want to read the query parameter value and act accordingly (i.e. change the sorting, change the button label,...-)
    //| read the query parameter values with useLocation() hook
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
