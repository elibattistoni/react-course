import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
});

/*
NB React.createContext() returns an object that contains components
# you will need to 1) provide it, and 2) consume it
# 1. "providing" == wrapping in JSX code all the components that should be able to tap into that Context, so that they can listen to that context (any component that is not wrapped, will not be able to listen)
since we need it everywhere, we will wrap everything in App component with it
and all the children and descendant of App will have now therefore access to that context (you can then remove Fragment because it also acts as a wrapping component)
# 2. we can listen in two ways: by using AuthContext consumer, or by using a ReactHook (we will typically use a ReactHook)
# 2.1 with a consumer: AuthContext.Provider in App.js, then in MainHeader, then in Navigation.js AutContext.Consumer
*/

export default AuthContext;
