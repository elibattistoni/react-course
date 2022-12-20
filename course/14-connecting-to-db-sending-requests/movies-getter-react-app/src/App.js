import React, { useEffect, useState, useCallback } from "react";
import Spinner from "./components/Spinner";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

// NB this is the way (best practice) to send HTTP requests from your React app to the backend in order to receive data from a database!!!!

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const starWarsAPIurl = "https://swapi.py4e.com/api/films";
  const firebaseAPIurlDB = `${process.env.REACT_APP_URL_FIREBASE_API}${process.env.REACT_APP_FIREBASE_TABLE}`;

  //# defiune function to load the movies (when the button is clicked)
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null); // to make sure that any previous error is cleared
    try {
      // the default method is get, therefore no need to specify it
      // const response = await fetch(starWarsAPIurl); // for get request (public api from which you can get data -- but not add data)
      const response = await fetch(firebaseAPIurlDB); // for post request (firebase)
      if (!response.ok) {
        throw Error(`${response.status} Error during fetch`);
      }

      const data = await response.json();

      const results = [];
      for (const [MovieId, MovieData] of Object.entries(data)) {
        results.push({
          id: MovieId,
          title: MovieData.title,
          openingText: MovieData.openingText,
          releaseDate: MovieData.releaseDate,
        });
      }
      console.log(results);
      setMovies(results);

      //- (star wars api)
      // destructure to get results
      // const { results } = data;
      // const editedResults = results.map((res) => {
      //   return {
      //     id: res.episode_id,
      //     title: res.title,
      //     openingText: res.opening_crawl,
      //     releaseDate: res.release_date,
      //   };
      // });
      //- update state (star wars api)
      // setMovies(editedResults);
    } catch (err) {
      setError(`💥💥 ${err.message}`);
      // console.error(`💥💥 ${err}`);
    }
    // set back loading to false regardless of whether getting the data was successful or not
    setIsLoading(false);
  }, []);

  //# load movies immediately when the app is loaded with useEffect
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]); //| we should add a pointer to fetchMoviesHandler as a dependency of this effect (the effect should be re-executed whent the function changes)
  //| and the fetchMoviesHandler could echance if we were using some external state (we are not doing it here, but we could)
  //| however, fetchMoviesHandler could change on every component re-render cycle because "it is a new object" therefore it is different
  //| so if we add if as a dependency we could create a infinite loop
  //| one solution could be to omit it, because in any case we are getting the result that we want
  //| however this could introduce subtle bugs if our function was using some external state
  //| so the best practice solution is to use useCallback to wrap the fetchMoviesHandler function with it
  //| so this works without an infinite loop, we can reload manually and when clicking the button
  //| so this is how we can leverage useEffect to make sure that we send an HTTP request immediately when a component loads and not just when a button is clicked
  //| importantly this can also be extended to send HTTP request when other things change
  //| and we also ensured that the HTTP request really runs when it needs to run but not when it does not need to run
  // NB useCallback() is a hook that allows us to store a function across component executions:
  // - it allows us to tell React that we want to save a function and that this function should not be recreated with every execution
  // - with this, the comparison work because only one function value is stored in memory
  // NB so if we know for certain that a function never changes, we can useCallback to store it
  // NB like with useEffect, useCallback wants a second argument: an array of dependencies

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else {
    if (error) {
      content = <p>{error}</p>;
    } else {
      if (movies.length === 0) content = <p>No movies found.</p>;
      else content = <MoviesList movies={movies} />;
    }
  }

  const addMovieHandler = async (movie) => {
    // NB the default request type for the fetch api is GET
    // NB but you can add parameters to make it a POST request
    const response = await fetch(firebaseAPIurlDB, {
      method: "POST",
      body: JSON.stringify(movie), //NB this is because the body does not want a javascript object but JSON data
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {isLoading && <Spinner />}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && !error && movies.length > 0 && (
          <MoviesList movies={movies} />
        )}
        {!isLoading && !error && movies.length === 0 && <p>No movies found.</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
