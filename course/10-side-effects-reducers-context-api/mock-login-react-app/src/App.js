import React, { Fragment, useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // simple React state: that is why when reloading the page this state is lost
  //# we want to persist/store this authenticated status somewhere so that it is not lost if we reload the page
  //# even better we want to make sure that whenever this app starts, we check if data was persisted
  //# and if it is persisted, we log the user in automatically so that the user does not need to re-render the details
  //# and that is where we can use the useEffect

  //============================================================================
  //# useEffect to persist isLoggedIn state and automatically log in
  //============================================================================
  useEffect(() => {
    //# this function is "the effect"
    // NB this function is executed AFTER EVERY COMPONENT RE-EVALUATION ONLY IF THE DEPENDENCIES ARE CHANGED
    // NB when you start the app for the first time, the dependencies are considered to have changed (before you had no dependencies), therefore it will run
    // NB after the first app xecution, in our case where we did not specified any dependency, the dependencies did not change because we don't have any
    // NB therefore this function will run only when the app is started, and then never again (no dependencies == no change of the dependencies after the first execution cycle)
    // NB and this is exactly what we want
    // this data fetching is a side effect, it is not directly related to the UI (the result is directly related to the UI but not the data retrieval itself)
    // we want to run it as a side effect with useEffect to avoid an infinite loop and to make sure that this code (which potentially could also be performance intensive)
    // does not run for every component re-render cycle, but only if we want it to run
    const storedLoggedInInfo = localStorage.getItem("isLoggedIn");
    if (storedLoggedInInfo === "1") {
      setIsLoggedIn(true); // if you update the state here the component will run again
    }
  }, []);

  // Handler function that executes when the user clicks the button
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    //# store that the user has logged in, in the local storage
    localStorage.setItem("isLoggedIn", "1");
  };

  const logoutHandler = () => {
    // remove the data about the login in the local storage
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </Fragment>
  );
}

export default App;

/*
What could be a good side effect? We could send a HTTP request to a backend
server which validates our email and password, but at the moment we don't have such server
therefore now I want to log in with any dummy credentials
then you are logged in, but if you reload the page, you lose the login status
/ let's make sure that this authenticated status remains if you reload the page
/ at the moment we lose it because the isLoggedIn state is a simple React state
*/
