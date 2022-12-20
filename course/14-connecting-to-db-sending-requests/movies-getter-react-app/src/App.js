import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

// NB this is the way (best practice) to send HTTP requests from your React app to the backend in order to receive data from a database!!!!

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = async () => {
    try {
      // the default method is get, therefore no need to specify it
      const response = await fetch("https://swapi.py4e.com/api/films");
      if (!response.ok)
        throw Error(
          `Error during fetch: ${response.status}, ${response.statusText}`
        );

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
      console.error(`💥💥💥 ${err}`);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
