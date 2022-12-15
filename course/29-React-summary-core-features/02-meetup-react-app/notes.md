# What is Routing?

e.g Netflix (NB a single page application): notice that when you click on something and you are redirected to another page, the page is not actually refreshed: IMPORTANT we want to give the user the illusion of having different pages to which we can navigate whilst actually staying on one and the same page, and leaving it up to React, to change what is visible on the page. The advantage of this approach is that we nwever have to wait for a new page to be loaded; instead, we can always stay fastm reactive because everything is handled by client side Javascript which is faster than sending a new request to a server. And this can really enhance user experience.
Therefore, we want to add something called **routing** to our project. We want to add a router, i.e. a special tool which watches changes in the URL and then changes what is visible on the screen based on the URL, and which basically gives the user the illusion of routing.

Install a third party package to our project:
    `npm install --save react-router-dom@5`
This is a package that allows to add routing functionality to react; it allows us to handle URLs and change what is visible on the screen without fetching new HTML pages.

## What does **add routing** mean?
We need to add this routing tool to our code so that it can watch for URL changes; and we need this tool know which component should be loaded as a page for which route (i.e. for which URL).
Create a new folder named "pages": BEST PRACTICE it is a good way of differentiating and of separating our components that are embedded in other components (which are storedn in the components folder), from the components that will be loaded as pages (NB we build them in the same exact way, it is just of help for us developers)

# Uploading images
https://academind.com/tutorials/reactjs-image-upload

# Getting user input and handling form submission
to handle the form submission, we have to do two main things:
- listen to the form submission; we have to prevent the browser default (sending an HTTP request automatically, and hence reloading the page) and handle the submission with JavaScript with react.
- read the entered values, i.e. get the actual input the user entered.

==> https://academind.com/tutorials/building-a-restful-api-with-nodejs
==> https://academind.com/tutorials/connect-to-database

# Sending the user form data to a server for storing it into a database
With React or with single page applications (SPAs) in general, we need a backend API to which you can send your requests; a backend which expects data in a certain format (typically JSON) and which returns data in that JSON format; a backend which simply exposes a couple of URLs to which you can send requests, and depending on which URL you are sending a request to, different things will happen: this is the kind of backend that you typically connect to with React. **You don't connect a front-end application like React or Angular to a database itself because of security**.
All the code you write in your React application is exposed to the visitors of your page. Through to dev tools, If I look at sources, if I dig into that I can read the JavaScript code that makes up your application. And database credentials would be in there as well. That's why instead we need a backend API, a backend server to which we can send requests and then its that server, which on the server connects to a database and stores data in a database. **We are going to use Firebase as a dummy backend**. Firebase is a service offered by Google. It is actually made up of a bunch of different services but it is a service which you can get started with for free. You just need a Google account. **Firebase is a service that contains a database and an API to which we can send requests, which will then ensure that data is saved in that database.**
We are  using this backend, this service, because that allows me to show you how you send requests to a backend. And you would then do that in the same way no matter which backend you use in the end. That's why that's a good service to use.

After creating the project go to "Realtime Database"
https://console.firebase.google.com/u/0/project/meetup-react-app-55f77/database
Create database ==> Start in test mode (not in locked mode) otherwise you will not be able to send requests
IMPORTANT this sets up a database and NB and API to which we can send requests
We can use the URL in the top of the container to send requests to, and behind the scenes on Firebase servers those requests will then be parsed, and depending on which kind of request we send, data attached to the request will be extracted and stored in the database automatically.
And therefore it can look like if we're directly sending requests to a database but we're actually sending requests to that Firebase API which then behind the scenes stores them in a database.

The Firebase real-time database service works such that this URL can be manipulated. We can add segments after this domain. And then these segments will be translated into folders ordatabase tables (e.g. https://console.firebase.google.com/u/0/project/meetup-react-app-55f77/database/meetups) and this (called with fetch, cfr NewMeetup.js) would add a meetup table. i.e. a meetup collection to the database (+ you need to add .json at the end of the segment you want to insert)


# Add navigation programmatically
When the user submits the form we want to give some feedback that it worked, so we want to navigate away from this page once the post request is sent.
note that previously we added manual navigation (in the header), but in this case we want to trigger navigation programmatically, once we are done with the task of sending the request (this is simple with React Router)

# Fetching data
On the starting page we want to show only the data stored in the database.
To load data from our backend (from our API) we need to send an HTTP GET request.
When do we want to send the request? Whenever the ALlMeetupusPage component is rendered

# Adding to favorites functionality
We will have different parts of the application that will be affected by the state of the favorites:
- in the All Meetups Page, mark if a meetup has been marked as favorite
- in the header, next to the "My Favorite" have a count of favorites
- in the My Favorites Page, have the list of favorites

Therefore, since we will have a state that affects more than one component, we will need a mechanism of managing that state globally and distributing that state to different components.
 We have two options:
 1. **Lifting the state up** (i.e. manage the favorites state in App.js and then we pass it into all the components that are interested through props)
        That would work, but it has a couple of downsides. One problem would be that if we have a bigger application with different States that affect different components we have to manage more and more state in this app component, and hence this app component becomes bigger and bigger and that's maybe not ideal. Another problem is that if we pass states down through props that we can end up with very long prop chains (i.e. we pass props to a component that does not need props necessarily for its own rendering, but only beause so it can pass it down to other components that need props -- not a good practice).
 2. Because of issues like this, there are state management solutions for managing application wide state in a more convenient way. One very popular state management package is Redux. I cover it in my course, but for many scenarios we don't even need Redux, because react also has a built in state management solution for application wide state. And that's a feature called **context**. For implementing this feature, ad in the src folder a new subfolder named **store** because in here we will set up the state store for this application.


# NB one improvement for this app would eb to add to the local storage the favourites