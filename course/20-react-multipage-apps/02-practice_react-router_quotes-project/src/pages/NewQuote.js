import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";

//% PROGRAMMATIC or IMPERATIVE NAVIGATION
//| here we want to add PROGRAMMATIC (IMPERATIVE) NAVIGATION: after the form submission,
//| we want to redirect the user somewhere else
//| we want to trigger a navigaiton action and navigate the user away programmatically
//| so it is not a link that the user clicks to navigate away, but it is some action
//| triggered by our code when some other action (sending data to a server) finished
//| and we want to trigger the navigation action from inside the NewQuote page component
//| how do we tell react router that we want to switch pages? with a react router hook: the useHistory hook
//| it is named like this because it allows us to change browser history (i.e. the history of the pages we visited)

const NewQuote = (props) => {
  //| redirect after submitting the form
  const history = useHistory();

  const addQuoteHandler = (quoteData) => {
    //NB send this data to a server
    console.log(quoteData);

    //| redirect
    //| the push method pushes a new page on the stack of the pages, i.e. a new
    //| page on our history of pages
    //| the replace method replaces the current page
    //| the difference is that with the push method we can go back with the back
    //| button to the page we are coming from, whereas with replace we cannot
    history.push("/quotes"); //| we will navigate away if we send the data
  };
  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
