import { createContext } from "react";

//| this constant named FavoritesContext is a React component
//| createContext() takes as input argument the initial value of the context, i.e. the initial value for this application or component-wide state
const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
});

//| in order to changing the app-wide state, we have to add another component in this file
//| this is a regular React component, and its job will be of providing this context to all the components that need information about the app-wide state
//| this component is also responsible of updating the context values
const FavoritesContextProvider = (props) => {
  //============================================================
  //| here we can manage the context data with state
  //| so when we manage state here and change the state, this component will be re-evaluated
  //| therefore it we change the context value (the state of the app) here,
  //| and we pass this context value with the provider to all the components that are listening, they will also be updated and re-evaluated
  const [userFavorites, setUserFavorites] = useState([]);

  //============================================================
  //| define functions that are needed to update the favorites
  const addFavoriteHandler = (meetup) => {
    //| this will depend on the latest state snapshot, therefore you need to give as input argument a function
    setUserFavorites((latestStateSnapshot) => {
      return [meetup, ...latestStateSnapshot];
    });
  };

  const removeFavoriteHandler = (meetupId) => {
    setUserFavorites((latestStateSnapshot) => {
      return latestStateSnapshot.filter((meetup) => meetup.id !== meetupId);
    });
  };

  const isFavoriteHandler = (meetupId) => {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  };

  //============================================================
  //| this object needs to have the same structure of the object given as input argument to createContext()
  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    //| expose pointers to the favorites updating functions
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    isFavorite: isFavoriteHandler,
  };

  //============================================================
  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
};
