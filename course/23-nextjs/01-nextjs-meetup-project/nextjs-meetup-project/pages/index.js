import Head from "next/head";

import { MongoClient } from "mongodb";
//| NB when in a page component file you import something that is only used in getServerSideProps or getStaticProps,
//| then the imported package will not be part of the client bundle (which is good both in terms of the size of the bundle and of security)

import { username, password, dbTable } from "../settings-mongodb";

import { Fragment, useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

export default function HomePage(props) {
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  //| VERY IMPORTANT: useEffect runs the function inside it AFTER the component function was executed
  //| NB this means that the first time the HomePage component is rendered, loadedMeetups will be an empty array
  //| then the effect function will be executed, and then the component function will be executed again because the state changed (within the effect function)
  //| and then it will re-render the list with the actual data
  //| NB and since there are these 2 render cycles, we have a problem with SEO (Search Engine Optimization)
  //| because the pre-rendered HTML page generated by NextJS automatically does not wait for the second rerender cycle
  //| (it always takes the first rendering cycle result and returns that as the pre-rendered HTML code)
  //| NB so we have a problem (and NextJS has the solution): i.e we want to pre-render a page with data, but for data that we have to wait for
  //| and we need to tell NextJS once we are done waiting
  //| NB HOW TO FETCH DATA FOR PRE-RENDERING
  //| NextJS gives us 2 possible solutions for this problem, i.e. 2 forms of pre-rendering: 1) STATIC GENERATION; and 2) SERVER-SIDE RENDERING

  //% METHOD 1) STATIC GENERATION
  //| NB STATIC GENERATION (the method that we should typically use):
  //| when using static generation, a page component is pre-rendered when you build your app / your NextJS prokect, when you build it for production (i.e. when you run "npm run build")
  //| the page is not pre-rendered on the fly on the server when a request reaches the server, but instead it is pre-rendered when you build your site for production
  //| and this means that after it is deployed, the pre-rendered page does not change
  //| NB NextJS by default generates the pages already statically during the build process, but if you need to wait for data (i.e. if you need to add data fetching to a page component)
  //| you can do so by exporting a special function from inside your page component file (and NB it works only in page component files, i.e in component files inside of the pages folder)
  //| you can export a function called "getStaticProps" (it has to be called like this, it is a reserved name)
  //| NextJS looks for a function with this name and if it finds it, it executes this function during this pre-rendering process
  //| so it will not directly call your component function and use the returned JSX snapshot as HTML content, but first of all it will call getStaticProps (before callingthe component function)

  //% METHOD 2) SERVER-SIDE RENDERING
  //| sometimes a regular update is not enough and you want to regenerate this page for every incoming requests,
  //| so you want to pre-generate the page dynamically after deployment on the server for every request (not during the build process and not every couple of seconds)
  //| for this you can use getServerSideProps

  useEffect(() => {
    // send HTTP request and fetch data
    // setLoadedMeetups(DUMMY_MEETUPS);
    setLoadedMeetups(props.meetups);
  }, []);

  // return <MeetupList meetups={loadedMeetups}></MeetupList>;
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
}

//% METHOD 1) STATIC GENERATION
export async function getStaticProps() {
  //| the job of this function is to prepare props for this page, and this props could contain the data that this page needs
  //| and this is useful because it is allowed to be asynchronous
  //| this function can return a promise and IMPORTANT NextJS will wait for this promise to resolve
  //| i.e. it waits until your data is loaded, and then you return the props for this component function
  //| so with this, you can load data before this component function is executed so that this component can be rendered with the required data
  //| here you can execute any code that would normally run only on a server
  //| e.g. you could access a file system, or securely connect to a database
  //| NB becayse the code that you write in here will never execute on the client side
  //| simply because this code is executed during the build process (not on the server and not on the clients)
  //| NB you have to return an object
  //| in this object you can configure various things, but you typically set a props property (it must be named props)
  //| and this props contain the props the you pass as input argument in your component

  //| so now, data is not fetched in a second component render cycle on the client but initially, before this page is pre-rendered, during the build process.
  //| IMPORTANT this is one of the main features of NextJS: this data fetching for pre-rendering
  //| SSG = Static Site Generation
  //| IMPORTANT you can add the "revalidate" property so that your pre-rendered page is updated when something (e.g. data in db) change
  //| when we add this property to the object returned by getStaticProps, we unlock a feature called "INCREMENTAL STATIC GENERATION"
  //| its value is the number of seconds that NextJS will wait until it regenerates this page for an incoming request
  //| this means that this page will be generated not only during the build process, but also every N seconds on the server, if there are requests for this page
  //| i.e this page will be regenerated (after deployment) on the server at least every 10 seconds if there are requests coming in for this page
  //| and then these regenerated pages will replace the old pre-generated pages
  //| and with this, you ensure that your data is never older than 10 seconds
  //| so the number of seconds that you want to use here depends on your data update frequency
  //| (e.g. if your data changes every hour, then set to 3600)
  //| if it changes all the time, then 1 would be better
  //| so that you don't have to redeploy and rebuild all the time just because some data changed

  //| NB getStaticProps is faster that regenerating and fetching data for every incoming request which we do with getServerSideProps
  //| (IMPORTANT your page will be faster when working with getStaticProps)

  //% connect to MongoDB
  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${password}@cluster0.ofhbk15.mongodb.net/${dbTable}?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray(); // this finds all the documents inside of the collection

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

/*
//% METHOD 2) SERVER-SIDE RENDERING
export async function getServerSideProps(context) {
  //| the difference with getStaticProps is that this function will run not during
  //| the build process, but instead always on the server after deployment
  //| this function is always for getting the props for this HomePage component
  //| you can still fetch data from an API or from the file system
  //| so all the other features are the same of getStaticProps
  //| the code that is written inside this function will always run on the server, never in the client
  //| so here you can run server side code like performing operations that use credentials that should not be exposed eo the users
  //| you cannot set the revalidate property
  //| but you can work with a context parameter; and from this context param you get access to the request object and the response object
  //| the request object can be helpful when you are working with authentication and you need to check some session cookie

  const request = context.req;
  const response = context.res;

  //NB you should really only use getServerSideProps if you need access to that concrete request object
  //- because you don't have access to reqeust and response in getStaticProps
  //- or if you have data that really changes multiple times every second, then therefore even revalidate will not help you

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}
*/
