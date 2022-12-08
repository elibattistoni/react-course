const AddUser = (props) => {
  // handler function that should be executed when the for is submitted (i.e. onSubmit)
  const addUserHandler = (event) => {
    event.preventDefault();
    console.log("form submitted!");
  };

  return (
    <form onSubmit={addUserHandler}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" />
      <label htmlFor="age">Age (Years)</label>
      <input type="number" id="age" />
      <button type="submit">Add User</button>
    </form>
  );
};

/*
IMPORTANT notice that since "for" is a reserved word in Javascript, when you need
/ to write a label element for a specific input, instead of referring it with for, you use htmlFor
*/

export default AddUser;
