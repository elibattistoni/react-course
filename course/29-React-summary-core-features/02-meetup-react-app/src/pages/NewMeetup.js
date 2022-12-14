import NewMeetupForm from "../components/Meetup/NewMeetupForm";

const NewMeetupPage = (props) => {
  const addMeetupHandler = (data) => {
    console.log("dnksjngkjsn");
    // https://meetup-react-app-55f77-default-rtdb.europe-west1.firebasedatabase.app/
  };

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
};

export default NewMeetupPage;
