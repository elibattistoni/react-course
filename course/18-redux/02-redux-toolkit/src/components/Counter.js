import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";

//% REDUX TOOLKIT: import actions
import { counterActions } from "../store";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const increaseHandler = () => {
    //NB if you need to pass payload into the actions:
    //- how you extract the value of the payload
    //NB remember that here redux toolkit will automatically create action objects with this syntax:
    //NB { type: SOME_UNIQUE_ID, payload}
    //NB any extra argument that you pass into the action method when you call it, will be stored inside an extra property named payload (the default)
    dispatch(counterActions.increase(10));
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
