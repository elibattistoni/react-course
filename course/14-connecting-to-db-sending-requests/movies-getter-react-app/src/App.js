import React, { useEffect, useState, useCallback } from "react";
import Spinner from "./components/Spinner";
import MoviesList from "./components/MoviesList";
import "./App.css";

// NB this is the way (best practice) to send HTTP requests from your React app to the backend in order to receive data from a database!!!!

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //# defiune function to load the movies (when the button is clicked)
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null); // to make sure that any previous error is cleared
    try {
      // the default method is get, therefore no need to specify it
      const response = await fetch("https://swapi.py4e.com/api/films");
      if (!response.ok) {
        throw Error(`${response.status} Error during fetch`);
      }

      const data = await response.json();

      // destructure to get results
      const { results } = data;
      const editedResults = results.map((res) => {
        return {
          id: res.episode_id,
          title: res.title,
          openingText: res.opening_crawl,
          releaseDate: res.release_date,
        };
      });

      //update state
      setMovies(editedResults);
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

  return (
    <React.Fragment>
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
