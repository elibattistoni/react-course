import React, { useState, useEffect } from "react";

// it is always a good idea to add your functions like the onLogout functionto the default context when you create a context
// and you can store a dummy function that doesn't do anything

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

/*
NB React.createContext() returns an object that contains components
# you will need to 1) provide it, and 2) consume it
# 1. "providing" == wrapping in JSX code all the components that should be able to tap into that Context, so that they can listen to that context (any component that is not wrapped, will not be able to listen)
since we need it everywhere, we will wrap everything in App component with it
and all the children and descendant of App will have now therefore access to that context (you can then remove Fragment because it also acts as a wrapping component)
# 2. we can listen in two ways: by using AuthContext consumer, or by using a ReactHook (we will typically use a ReactHook)
# 2.1 with a consumer: AuthContext.Provider in App.js, then in MainHeader, then in Navigation-consumer.js AutContext.Consumer
# 2.2 with useContext
*/

// depending on your application structure and how you are managing data,
// you might also want to pull more logic out of the App component and create a separate Context Management component
export const AuthContextProvider = (props) => {
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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
//NB with the addition of AuthContextProvider now we have this standalone file
//NB that manages the entire login state in this AuthContextProvider component
//NB and which also sets up all the context
//Nb now you can strip away this part from the App component

export default AuthContext;
