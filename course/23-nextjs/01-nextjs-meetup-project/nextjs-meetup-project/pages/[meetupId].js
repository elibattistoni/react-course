import { MongoClient, ObjectId } from "mongodb";
import { username, password, dbTable } from "../settings-mongodb";
import Head from "next/head";
import { Fragment } from "react";

import MeetupDetail from "../components/meetups/MeetupDetail";

//| NB here we also need to use getStaticProps or getServerSideProps because we
//| have some data that we want to render when the page is first loaded

export default function MeetupDetails(props) {
  return (
    // <MeetupDetail
    //   image={props.meetupData.image}
    //   title={props.meetupData.title}
    //   description={props.meetupData.description}
    //   address={props.meetupData.address}
    // />
    //| to add metadata
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

//% NB always remember that the code inside getStaticPaths and getStaticProps and getServerSideProps always runs during build time

//% NB getStaticPaths is a function that NextJS understands, that we have to export
//% in a page component file if it is a dynamic page and if we are using getStaticProps (not if we are using getServerSideProps)
//| NB since it is a dynamic page, in order to pre-generate it, NextJS should pregenerate the content for all possible ids
//| so we need to pregenerate for all the URLs (for all the meetupId values) that the users might be entering
//| and if they enter an ID for which we did not pregenerate the page, they will see a 404 error
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${password}@cluster0.ofhbk15.mongodb.net/${dbTable}?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray(); // in the first object you can define the filter criteria; in the second you can define the fields that should be extracted
  // here we say to include only the id and not the other field values

  client.close();
  return {
    //| NB the fallback property indicates whether your paths array contains all supported parameter values or just some of them
    //| if false, you say that your paths contain all supported meetup ID values
    //| this means that if the user enters anything that is not supported here (e.g. "m3"), they would see a 404 error (--> false --> to indicate that I defined all supported paths)
    //| if you set it to true, Nextjs tries to generate a page for this meetup id dynamically on the server for the incoming request
    //| fallback is a nice feature because it allows you to pre-generate some of your pages for specific meetupId values (e.g. the ones that are visited most frequently)
    //| and then pre-generate the missing ones dynamiclaly when requests for them are coming in
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    /*
    paths: [
      {
        params: {
          //| if you have mutliple dynamic segments in your url, then you should add the corresponding keys here
          //| in our case we have only the id
          //| NB in the real world, you would not hard-code these values, but you would fetch them from a DB and  generate this array dynamically
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
    */
  };
}

export async function getStaticProps(context) {
  //| in getStaticProps, the context object will have a params property (and not a req and res properties)
  const meetupId = context.params.meetupId; //| NB context.params.meetupId because meetupId is what you have inside the square brackets

  // fetch data for single meetup

  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${password}@cluster0.ofhbk15.mongodb.net/${dbTable}?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  //% find single meetups in db
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
