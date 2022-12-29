import { useEffect } from "react";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

const AllQuotes = (props) => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  // sends a request every time the component is rendered
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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

  // display no components if loaded components is empty
  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0))
    return <NoQuotesFound />;

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
