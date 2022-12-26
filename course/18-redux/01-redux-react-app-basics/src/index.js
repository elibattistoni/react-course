import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

//| REDUX
import { Provider } from "react-redux";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* //| now all the child components of App can tapo into the redux */}
    {/* //| store: they can set up a subscription to the store data, and they can */}
    {/* //| dispatch actions */}
    {/* //| go to the Counter component to see how to set up a subscription and dispatch actions */}
    <App />
  </Provider>
);
