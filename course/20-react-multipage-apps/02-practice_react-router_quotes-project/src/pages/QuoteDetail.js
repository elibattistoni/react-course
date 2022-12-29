import { Fragment, useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

/*
React Router: create nested paths dynamically with useRouteMatch
% we don't have to write the full path for nested routes!
| React Router gives us a Hook that we can use so that we do not have to write
| the full path when we want to have nested routes
| this hook allows us to find out for which URL the current component was rendered,
| so that we don't have to repeat that path in the URL: useRouteMatch
| it is similar to useLocation but it has more info about the currently loaded route
| not just about the URL but about some internally managed data that React Router is aware of
| in this way we can safely change the parent routes in App.js
*/
const QuoteDetail = (props) => {
  const match = useRouteMatch();
  // console.log(match); //NB we can use this match object to create the nested paths dynamically!

  const params = useParams();
  const { quoteId } = params;
  // we neede the code below when we had the dummy data, before getting the data with an http request to firebase
  // const quote = DUMMY_QUOTES.find((q) => q.id === params.quoteId);

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  // show spinner if status is pending
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  // display error
  if (error) return <p className="centered focused">{error}</p>;

  if (!loadedQuote.text) return <p>No quote found!</p>;

  return (
    <Fragment>
      {/*
        <h1>Quote Detail Page</h1>
        <p>{params.quoteId}</p
      */}
      {/*
      React Router: conditionally render content without State
      //% here we use React Router to conditionally render different content
      //% based on the URL without having to manage some complex state!!
      */}
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {/* NB not dynamically generated: path={`/quotes/${params.quoteId}`} */}
      <Route path={match.path} exact>
        <div className="centered">
          {/* NB not dynamically generated: path={`/quotes/${params.quoteId}/comments`} */}
          <Link to={`${match.url}/comments`} className="btn--flat">
            Load Comments
          </Link>
        </div>
      </Route>

      {/*
        React Router: set dynamic paths
        //% DYNAMIC PATH
        alternatively, since we are defining a route here (not a link),
        you can also set path="/quotes/:quoteId/comments"
      */}
      {/* NB not dynamically generated: path={`/quotes/${params.quoteId}/comments`} */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
