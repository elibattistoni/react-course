import React, { Fragment, useState } from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };

  /*
  = Portals
  # portals need 2 things: 1) a place where you want to port the Component to, and 2) you need to let the Component know that it should have a portal to that place
  # 1) to mark the place, go to the index.html file and add a div with an id that you will use to identify that place with "backdrop-root" and "overlay-root"
  # 2) go to the ErrorModal component definition and tell React that this component (ErrorModal) should be portaled somewhere (add the Backdrop component in ErrorModal.js)
  */

  return (
    <Fragment>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </Fragment>
  );
}

export default App;
