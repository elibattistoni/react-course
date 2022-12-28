//% for routing you need to do this
import { Route } from "react-router-dom";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";
//| Route is a component that allows us to define a certain path and the React
//| component that should be loaded when that path becomes active in the URL

//% create the folder "pages" or "screens" instead of "components" (best practice)
//% because we do not use these components (Welcome and Products) like all the other components
//% because they are use in a special way, in the sense that we use them as routes (NB but they are regular React components!!)
//% i.e. components that we load through the router

function App() {
  return (
    <div>
      {/*
      //% define different routes
      //NB the Route component makes sure that the Welcome component is only
      //NB displayed on the screen if the URL path is /welcome, otherwise it will not be displayed
      */}
      <Route path="/welcome">
        <Welcome />
      </Route>

      <Route path="/products">
        <Products />
      </Route>
    </div>
  );
}

export default App;
