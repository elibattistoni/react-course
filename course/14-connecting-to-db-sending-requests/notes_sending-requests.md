# How to connect to databases
React apps, or in general browser-side apps/code (i.e. Javascript code running in the browser) should never DIRECTLY talk to a database: if you directly connect to a database server from inside your client-side / browser-side Javascript code, then you would expose your database credentials in that code.
Remember that all Javascript code running in the browser can be accessed and read not just by the browser but also by the users of your website. Read this article on hiding Javascript code: https://academind.com/tutorials/hide-javascript-code. In addition, directly connecting to a database could also bring other problems like performance issues. But the security problem is the biggest problem of all.

So, instead of directly talking to a database from inside your React code, you can take another route: you have a **Backend Application** (NodeJS app, PHP app, Python app) running on another machine, not running in the browser, but running on some server (maybe on the same server of the database, but often they are on different servers); and it is this Backend application that will talk directly to the database, because you can safely store and use database credentials on the backend application, since the backend cannot be viewed by the users; therefore, React will talk to the Backend, specifically to the Backend API, which is a server that exposes different URLs to which you can send different requests (and for talking to the backend, no security details are needed).

# The Star Wars API
Our demo backend that we will use is the Star Wars API.
We will use this page: https://swapi.dev/
Loading this page (and hence accessing this backend) might fail - if that is the case for you, you can use this alternative: https://swapi.py4e.com/

We will use this "backend" in order to fetch data from a database which contains some example movies.

The Star Wars API is a backend app, it is not a database (because browser-side apps cannot connect directly to a database) ==> of course behind the scenes, this backend API probably uses some database to store some data about the Star Wars movies; but we interact with this Backend app).

**API** is a very broad term not just related to React and HTTP requests; in the end, it means that in our code we're dealing with something which has a clearly defined interface, clearly defined rules on how we can achieve certain results and do certain tasks, and when we talk about APIs in the context of HTTP requests we typically talk about REST or GraphQL APIs, which are basically two different standards for how a server should expose its data.
This is a REST API, and it simply means that there are a couple of URLs, like this URL which you see here, to which you send that request to get back data in a certain format. And different URLs to which you send different requests will give you different chunks of data. That's what makes it an API. You got different entry points, which lead to different results (more on REST APIs and GraphQL APIs https://academind.com/tutorials/rest-vs-graphql).