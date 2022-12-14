import { Route, Switch } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetups";
import FavoritesPage from "./pages/Favorites";
import NewMeetupPage from "./pages/NewMeetup";

/*
Route component: its job is to define different paths in the URL we want to listen to,
and which component should be loaded for these different paths

NB
domains:
localhost:3000
mypage.com

NB
domains + paths
localhost:3000/page-path
mypage.com/page-path


careful that with Route, when in the browser you go to /new-meetup, React will
show both the component in the Route with path="/" and the component in the Route with path="/new-meetup"
because this path includes the "/", therefore it renders both components
because by default React Router matches ALL YOUR PATHS and it simply checks whether the current path includes the routers paths

in this case there is another component provided by react router dom, which helps us: the Switch component
with this, we tell the React Router that only one of these routes should be active, and therefore at most one of these pages should be rendered
and when calling the route component you should specify the prop exact (if true, no need to add anything else, it is the same as exact={true})
this tells the react router that for this route it should not check is the path begins with that path, but if the full path matches ths path

*/

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact={true}>
          {/* this is the default path -- this is the starting page and the page
        that shold be loaded on this route, is the AllMeetupsPage */}
          <AllMeetupsPage />
        </Route>
        <Route path="/new-meetup">
          <NewMeetupPage />
        </Route>
        <Route path="/favorites">
          <FavoritesPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
