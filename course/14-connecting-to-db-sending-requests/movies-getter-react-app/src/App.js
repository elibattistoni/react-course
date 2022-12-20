import React, { useState } from "react";
import Spinner from "./components/Spinner";
import MoviesList from "./components/MoviesList";
import "./App.css";

// NB this is the way (best practice) to send HTTP requests from your React app to the backend in order to receive data from a database!!!!

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
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
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <Spinner />}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && !error && movies.length > 0 && (
          <MoviesList movies={movies} />
        )}
        {!isLoading && !error && movies.length === 0 && <p>No movies found.</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
