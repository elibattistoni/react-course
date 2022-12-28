import { Route, Switch, Redirect } from "react-router-dom";
//% NB the Switch component allows you to not have multiple pages on the screen
//% simultaneously (see below) and NB the first route that matched
//% (if it matches the start of a path, not the entire path) will be displayed
//% NB add the prop "exact" to make it truly match

//% the Redirect component allows us to redirect a user to a specific page

import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        {/* //% SWITCH for displaying a single route */}
        <Switch>
          <Route path="/welcome">
            <Welcome />
          </Route>

          <Route path="/products" exact>
            <Products />
          </Route>

          {/*
            //% DYNAMIC ROUTES & SWITCH COMPONENT
            //NB keep in mind that react-router works in a way that all routes that match (i.e. that start with) the current path will be loaded
            //- if you want to have one active route at a time, you have to use another component of React Router, i.e. the **Switch** component
            //- you wrap all your Route components with this Switch component and then only one of these routes will be active at a specific time
            //NB the route that is matched first will be displayed, it does not matter if there are more specific routes after that!
            //NB you can add the prop exact to avoid this behavior and have a complete match (to match the full path)
          */}
          <Route path="/products/:productId">
            <ProductDetail />
          </Route>

          {/* //% REDIRECTING */}
          <Route path="/" exact>
            <Redirect to="/welcome" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
