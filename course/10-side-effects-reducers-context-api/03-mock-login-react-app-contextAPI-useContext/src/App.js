import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  /*
  by specifying the value prop
  <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
      }}
    >
  you will be able to change that object e.g. through state and the app component, and whenever it changes, the new value will be passed down to all consuming components
  */

  //NB you can make CONTEXT DYNAMIC by passing not only data to our components, but also functions
  // we can pass down onLogout a pointer to logoutHandler
  // so that every component that listens to AuthContext will be able to use the logoutHandler function

  // in the <main></main> we still pass this
  // {!isLoggedIn && <Login onLogin={loginHandler} />}
  // {isLoggedIn && <Home onLogout={logoutHandler} />}
  // because we directly use those handlers in the Login component and in the Home component (we are not really forwarding it)

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
      }}
    >
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
