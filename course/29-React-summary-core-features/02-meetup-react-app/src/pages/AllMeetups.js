import { useEffect, useState } from "react";
import MeetupList from "../components/Meetup/MeetupList";

const AllMeetupsPage = (props) => {
  // define state
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  // NB this will cause an infinite loop: component renders ==> send HTTP request ==> change state ==> component re-renders ==> sends request ==> state changes ==> ...
  // NB React has a solution for it: useEffect, which is a React Hook that allows you to run the code only under certain conditions
  // NB with useEffect we will be able to restrict the behavior of sending the https request whenever the component renders, so that it does not send a request every time
  useEffect(() => {
    setIsLoading(true);
    // fetch data from the database through our backend API
    fetch(`${JSON.parse(process.env.REACT_APP_URL_DB_TABLE)}`)
      .then((response) => {
        //NB the response object is returned from the fetch promise automatically as an argument
        //NB because this is how the fetch() function works: it returns a promise, which resolves to the actual response AT SOME POINT
        //NB and from the response we want to read the body
        // NB response.json() also returns a promise!!
        return response.json();
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });

    //NB javascript will not wait for the fetching to complete before returning the JSX, because it is asynchronous
    //NB we cannot defer returning a value until we have a concrete response (remember that the components shoudl be synchronous)

    //NB instead what we need to do is to return some temporary JSX code (e.g. a loading spinner)
    //NB and when we have the response, we want to update the returned JSX code
    //NB we will control this with state, since this is the method with which we change stuff on the screen
    //NB so we start with a loading state and we set it to false once we have the data

    //| using useEffect
    //| With the second argument (i.e. dependencies), React will check the values you add to this array,
    //| and compare them to their equivalents when this effect function was executed the last time.
    //| CASE 1) NO DEPENDENCIES
    //| Now, if that's an empty array, there are no dependencies.
    //| And then React will only execute this function when this component function rendered and executed for the first time.
    //| And for subsequent executions of this component function this effect function will not run because we have no dependencies,
    //| so the values of the dependencies are always the same because there are no values.
    //| CASE 2) DEPENDENCIES
    //| rule: you shouls add all the external values your effect function relies on
    //|  in our scenario here, we use useEffect with an empty dependencies array
    //| since we have no external dependencies and therefore this code will only run once when this component is rendered for the first time.
  }, []);

  return (
    <section>
      <h1>All Meetups Page</h1>
      {isLoading && (
        <section>
          <p>Is loading...</p>
        </section>
      )}
      {!isLoading && <MeetupList meetups={loadedMeetups} />}
    </section>
  );
};

export default AllMeetupsPage;
