//% NESTED ROUTES
import { Route } from "react-router-dom";
//| IMPORTANT we are not limited to defining routes in one place only: you can define routes wherever you want
//| if they are on a component that is currently active, they will be evaluated by React Router DOM
//| so if we add a Route here on the Welcome page
//NB if the Welcome page is currently active, this Route will be evaluated
//NB if the Welcome page is not active, this Route will not be evaluated

const Welcome = () => {
  return (
    <section>
      <h1>Welcome Page</h1>
      <Route path="/welcome/new-user">
        <p>Welcome, new user!</p>
      </Route>
    </section>
  );
};

export default Welcome;
