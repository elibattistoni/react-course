import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

//% for routing you need to do this
import { BrowserRouter } from "react-router-dom";
//| this is another component provided by react-router-dom
//| and you need to wrap the App component with this BrowserRouter component
//| --> this will activate the React Routert and unlock the React Router features (like defining routes)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
