import { Fragment } from "react";
import { Route, useParams } from "react-router-dom";
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
      <HighlightedQuote text={quote.text} author={quote.author} />

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
