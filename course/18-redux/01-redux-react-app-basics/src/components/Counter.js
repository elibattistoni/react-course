import classes from "./Counter.module.css";

//| REDUX
import { useSelector, useDispatch } from "react-redux";
//| this is to get access, to listen to the store
//| you can do this with 2 hooks: useSelector allows to automatically select a part of the state managed by the store
//| or you can use also useStore, which gives access to the Store
//| if you use class based components, you can also import and use a "connect" function (which can be used as a wrapper around our class component to connect that class component to the store)

const Counter = () => {
  //| REDUX --> CONNECT TO STORE (LISTEN)
  //| get access to the data managed in our store by using useSelector (which takes as input argument a function)
  //| the input function will be executed by redux and it determines which piece of data we want to extract from our store
  //| when you use useSelector, react-redux will automatically set up a subscription to the redux store for this component
  //| so this component will be updated and it will receive the lastest counter automatically whenever that data changes in the Redux store
  //| so changes in the redux store will cause automatically this component function to be re-executed (so you always have the latest counter)
  //| furthermore, if you unmount this component or if it is removed from the DOM, then react redux also automatically clears the subscription
  const counterInCentralDataStore = useSelector(
    (currentState) => currentState.counter
  );

  //| REDUX --> DISPATCH ACTION
  const dispatch = useDispatch();
  const incrementHandler = () => {
    // dispatch({ type: "increment" }); // this is without a value
    dispatch({ type: "increment", amount: 5 });
  };
  const decrementHandler = () => {
    // dispatch({ type: "decrement" });
    dispatch({ type: "decrement", amount: 5 });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>
        COUNTER VALUE: {counterInCentralDataStore}
      </div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
    </main>
  );
};

export default Counter;

/*
//NB with class based components:

class Counter extends Component {
  incrementHandler() {
    this.props.increment();
  }

  decrementHandler() {
    this.props.decrement();
  }

  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter
  };
}

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

*/
