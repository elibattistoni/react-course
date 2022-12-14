import NewMeetupForm from "../components/Meetup/NewMeetupForm";
import { useHistory } from "react-router-dom";
// NB you use useHistory to navigate programmatically: once the post request is sent, we want to navigate away from the page automatically

const NewMeetupPage = (props) => {
  // get the history object
  const history = useHistory();
  // this is an object that exposes cerain methods that allow us to manipulate the browser history, e.g. to navigate away
  // remember that fetch() returns a promise, which resolves as soon as the task inside fetch is completed
  // therefore you can add the then() method in which you will execute this history (after sending the data, you want to navigate away)

  const addMeetupHandler = (data) => {
    //| for sending HTTP requests we can use fetch() which is a default Javascript function
    //| we could also use a third-party package like axios, which is a popular library for sending HTTP requests
    //| by default fetch sends a GET request, but we want to send a POST request
    //| to transform it into a post request, you have to add an object to configure the post request
    fetch(
      "https://meetup-react-app-55f77-default-rtdb.europe-west1.firebasedatabase.app/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          //| add this extra metadata to the outgoing request and make it crystal clear that this request carries json data, some APIs also required this
        },
      }
    ).then(() => {
      history.replace("/");
      //navigate to the starting page
      //NB there is another method that you could youse, i.e. back() but it will take you to the form again
    });
    //| We can do more with fetch, e.g. listen to the success vs error responses
    //| (we do that in the full react course,but for the moment, this is enough
    //| because this will send a post request with our data to Firebase
  };

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
};

export default NewMeetupPage;
