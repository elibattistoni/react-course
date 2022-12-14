import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

/*
IMPORTANT after creating the placeholder (empty components) AllMeetupsPage, FavoritesPage and NewMeetupPage
we need to use the router package to define when which page should be loaded

1. wrap the app component with another component (BrowserRouter)
so we initialize the router package, we make it aware of this App component and we ensure that it watches our URLs

2. we need to define the URLs we want to support and which pages whould be loaded
for the different URLs: do this in the App component (where you import and use the Route component)
*/

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
