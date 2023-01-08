import { MongoClient } from "mongodb";

import { username, password, dbTable } from "../../settings-mongodb";

//| NB the url of this file is /api/new-meetup
//| and if/when a request is sent to this URL, it will trigger the function defined in this file

export default async function handler(request, response) {
  if (request.method === "POST") {
    const data = request.body; // this contains the data of the incoming request
    // data is an object with properties: title, image, address, description

    //| NB this is a secure place to have credentials: this code will never end up on the client side
    const client = await MongoClient.connect(
      `mongodb+srv://${username}:${password}@cluster0.ofhbk15.mongodb.net/${dbTable}?retryWrites=true&w=majority`
    );
    //| connect returns a promise therefore we have to turn this handler function into an async function

    const db = client.db();

    const meetupCollection = db.collection("meetups"); //| NB this is the name of the collection (the one above was the name of the db table) this is not the same name of the db, it is not the same thing but it can have the same name

    const result = await meetupCollection.insertOne(data);

    console.log(result);

    client.close();

    response.status(201).json({ message: "Meetup inserted!" });
  }
}
