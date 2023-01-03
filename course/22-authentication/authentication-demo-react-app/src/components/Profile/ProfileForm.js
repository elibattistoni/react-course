import { API_KEY } from "../Auth/apikey";
import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  //% here we want to send the request for changin the password for a specific user

  const history = useHistory();

  const newPassword = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredNewPassword = newPassword.current.value;

    // add validation if you want
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // let's assume that it always succeeds
      // redirect the user
      history.replace("/");
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPassword}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
