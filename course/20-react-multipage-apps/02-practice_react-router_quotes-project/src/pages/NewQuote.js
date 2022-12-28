import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = (props) => {
  const addQuoteHandler = (quoteData) => {
    // TODO send this data to a server
    console.log(quoteData);
  };
  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
