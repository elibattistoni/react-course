import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App"; // do not write from "./App.js"

/*
NB the .createRoot() method creates the main entry point (the main hook) of the overall user interface that we are about to build with React
this method tells react where the react application (i.e. the user interface) should be placed in the webpage that is loaded
and this leads us to the index.html file in the public folder: the index.html file is the single HTML file that is loaded by the browser and
the only html file that is being used by this overall React application (because it is a so-called single page application)
SINGLE PAGE APPLCIATION: it has a single html file and all subsequent changes on the user interface (on the webpage) are handled by React
and this index.html file is the entry point, i.e. the place where the React-driven user interface should be rendered into
in the body, there is a div with id="root" : this does not contain any content, but that is the div where we want to attach (or inject) our React-driven user interface
and this div is what you get here with the id (in the .createRoot() method)
then we store the root object in a constant and call the render method on the root object to tell React what should be rendered in that div
and we want to render the content in App.js: NB App in the end is a COMPONENT
NB this is JSX syntax
so we render the App component inside the div with id="root"
*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
