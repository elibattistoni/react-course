import classes from "./Auth.module.css";

//% redux-toolkit for dispatching actions
import { useDispatch } from "react-redux";
// import { authActions } from "../store"; // this was before refactoring (splitting the multiple slices into different files)
import { authActions } from "../store/auth-slice";

const Auth = () => {
  const dispatchFunction = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatchFunction(authActions.login());
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
