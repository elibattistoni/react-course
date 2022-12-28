import { Fragment } from "react";
import { Link, Route, useParams } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";

const DUMMY_QUOTES = [
  { id: "q1", author: "Max", text: "Learning React is fun" },
  { id: "q2", author: "Elisa", text: "Learning React is great" },
];

const QuoteDetail = (props) => {
  const params = useParams();

  const quote = DUMMY_QUOTES.find((q) => q.id === params.quoteId);

  if (!quote) return <p>No quote found!</p>;

  return (
    <Fragment>
      {/*
        <h1>Quote Detail Page</h1>
        <p>{params.quoteId}</p
      */}
      {/* 
      //% here we use React Router to conditionally render different content
      //% based on the URL without having to manage some complex state!!
      */}
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`/quotes/${params.quoteId}`} exact>
        <div className="centered">
          <Link to={`/quotes/${params.quoteId}/comments`} className="btn--flat">
            Load Comments
          </Link>
        </div>
      </Route>

      {/*
        //% DYNAMIC PATH
        alternatively, since we are defining a route here (not a link),
        you can also set path="/quotes/:quoteId/comments"
      */}
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
