import React, { useState } from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  // initialize state
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (enteredUserData) => {
    const userData = {
      ...enteredUserData,
      id: Math.random().toString(),
    };

    setUsersList((previousUsers) => {
      return [userData, ...previousUsers];
    });
  };

  return (
    <div>
      <AddUser onSubmitUserData={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
