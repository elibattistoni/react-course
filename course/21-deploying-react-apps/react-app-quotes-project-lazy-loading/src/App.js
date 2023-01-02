import { Route, Switch, Redirect } from "react-router-dom";

import AllQuotes from "./pages/AllQuotes";
// import QuoteDetail from "./pages/QuoteDetail";
// import NewQuote from "./pages/NewQuote";
// import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";

//% LAZY LOADING
//| here we define the main routes
//| even though the different pages are only visited when the URL matches the path defined in the Route,
//| all the code is downloaded in advance because we have all the import statements, and they are all evaluated when our code is bundled up (during the building proces)
//| so let's comment the imports above and do:
import React, { Suspense } from "react";
import LoadingSpinner from "./components/UI/LoadingSpinner";
//| if we want to download the code for the NewQuote component when the user really visits the route:
//| (we use the constant "NewQuote" because it is the one that we use below to render the page)
//| React.lazy wants a function that resolves a dynamic import
//| and the function (the import function) will be executed only when the NewQuote component is needed, IT WILL NOT BE EXECUTED IN ADVANCE
//| therefore this creates a new code chunk that is downloaded only when the newQuote is visited
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
//| IMPORTANT we need to define a fallback UI, a fallback content that can be shown if the download of this code chunk takes a bit longer (it can take a couple of msec or sec)
//| for this we need the Suspense component
//| and we need to wrap this around the code where we use React.lazy

const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

//| since AllQuotes is the component that is rendered when the user lands on the page, then loading it lazily does not make much sense because the code will be needed anyways

//| IMPORTANT lazy loading can be an important building block of an application because it makes the initial code bundle smaller
//| in large applications with lots of pages, where all the pages then also have a lot of components
//| and complex logic attached, lazy loading can really make a difference and can make the initial loading of your website
//| much faster, because not all the code is loaded at once, but only the code that is needed.

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
