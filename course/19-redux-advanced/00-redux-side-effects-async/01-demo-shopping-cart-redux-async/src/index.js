import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./store/index";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

//% WRAP REACT-REDUX PROVIDER AROUND APP, so that all the child components can access the Store
//% provide the Redux Store to the whole application
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
