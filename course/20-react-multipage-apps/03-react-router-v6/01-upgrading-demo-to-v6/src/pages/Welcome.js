import { Route, Routes } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>

      {/*
        //| NB if you had a link here, the to prop would also be relative
      */}
      <Link to="new-user">New User</Link>

      {/*
        //| NB NESTED ROUTES:
        //# OPTION 1
      */}
      {/* <Routes>
        <Route path="new-user" element={<p>Welcome new user</p>} />
      </Routes> */}

      {/*
        //| NB NESTED ROUTES:
        //# OPTION 2
      */}
      <Outlet />
      {/* this Outlet component is simply a placeholder that tells React where the nested route content should be inserted */}
    </section>
  );
};

export default Welcome;
