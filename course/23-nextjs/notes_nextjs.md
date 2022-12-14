# What is NextJS

NextJS is the React framework for production https://nextjs.org/
NextJS ==> is a full-stack framework for ReactJS

NextJS builds upon React, and makes it building large scale React applications easier

# NextJS key features
1. **Built-in server-side rendering** (server-side rendering ==> is all about preparing the content ofa a page on the server instead of the client)
If that page would be pre-rendered on the server, if that data fetching somehow could be done on the server, when the request hits that server and then the finished page would be served to our users and to the search engine crawlers, then users would not have that flickering loading state and search engines would see our page content. And that's the problem server-side rendering solves. It allows us to pre-render React pages, React components on a server. Now ReactJS actually has built-in features that allow you to add server-side rendering but it can be tricky to get that right. And it requires extra setup from your side. With NextJS, that becomes way easier because NextJS has built-in server-side rendering. It automatically pre renders your pages and that means that with NextJS, if you build a standard NextJS app, without any extra setup from your side, if you visit such a page, it was pre-rendered on the server by default out of the box.
with NextJS, after this initial load offered as initial request, we still get a standard React app running in the browser, a standard single page application even, subsequent navigation actions by the user. So when the user then browses our page and navigates around, those actions are all handled by React in the browser to have this fast interactive user experience which we typically wanna offer with React, which was one of the reasons why you would use React typically.
2. **File-based Routing** In traditional React, you don't even have a router (routing means that we give the user the illusion of having multiple pages). When we navigate around and we load different pages, then that's the job of a router. Typically we use React Router for that. This router basically watches the URL, and when it changes, it basically prevents the browser default of sending a request to some backend server, and instead renders different content on the page with React. A different component in the end. That's what routing is.
React Router is a great package, but it is extra code which you have to write. And then often you end up storing your components that act as pages in a separate folder, which kind of replicates your route set up in code.
with NextJS, you would define pages and routes with files and folders. You have a special pages folder in NextJS apps which has to be named pages, and then you are structuring that folder, defines the routes and paths  our page supports.
3. **Build Fullstack Apps** NextJS also makes it easy for us as a developer to add backend code to our react project. So to build a full stack react project, where we don't just have the client side code maybe with server-side pre-rendering, but where we also have standalone backend code, that for example, works with the file system or reaches out to a database. With NextJS it's very easy to add our own backend API into our react project using NodeJS code. So we can easily add such code to our Next react apps when using NextJS. That's easy to add with NextJS, we can stay in one project, we have to know some NodeJS code forded arguably, but we would have to know that anyways when we build our own backend, and then we don't have to build a standalone REST API project, but instead we can work on one project, our Next project, and add all the client's side code, our react user interface, and also blend in our backend API code. That's why NextJS is amazing.

# Creating an NextJS project

https://nextjs.org/

npx create-next-app

Need to install the following packages:
  create-next-app@13.1.1
Ok to proceed? (y) y
??? What is your project named? ??? first-nextjs-project
??? Would you like to use TypeScript with this project? ??? No / Yes
??? Would you like to use ESLint with this project? ??? No / Yes

## Contents of a NextJS project created with npx create-next-app
In the public folder there is no "index.html" file which we usually find in React projects. The reason for this is that NextJS has the built-in pre-rendering: it still gives you a Single Page Application, but that single page is dynamically pre-rendered when a request reaches the server, so that you return an initial page with content. To be precise, NextJS allows us to determine WHEN a page should be pre-rendered (but we are going to learn this step by step).
NB The pages folder is the most important one, because in this folder we will set up the file-based routing for defining the different pages that the application should have.

the index.js file contains a standard react component

NB path segments in the URL (e.g. /news) can be created in 2 ways: in the pages folder, you can have:
- a news.js file --> **pages/index.js**
- a news folder and inside of it, an index.js file --> **pages/news/index.js**
and they will both point to: **our-domain.com/news**
NB the option you choose matters when you want to create **nested paths**
e.g. if you want to have: our-domain.com/news/news-id-details then you really need to have the news subfolder, inside of the pages folder
and if you create .js files directly in the pages folder, then you are limited to have one segment only in the URL

## Start Development Server with `npm run dev`


## Web pages pre-rendering
- see index.js and [meetupId].js --> getStaticProps (and getStaticPaths), getServerSideProps to prepare the props to use in a page/component

## API routes
NextJS makes it easy for us to create a backend API, together with our frontend React app in the same project. for this we can use a NextJS feature called API routes.

**API routes** are special routes, special pages that do not return HTML code, but instead they accept incoming HTTP requests (post, patch, put, delete) with JSON data attached to them, and that might do whatever you need to do, e.g. store data in a database and then return JSON data. --> API routes allow you to build your own API endpoints as part of a NextJS project, and they will be served by the same server as your Next app.

In order to add API routes, you have to add a special folder named "api" in your "pages" folder; then NextJS will pick up the .js files stored in there and turn those files into API routes (the file names will act as path segments in the URL), i.e. turned into endpoints that can be targeted by requests and that should receive JSON and return JSON. NB in these files you define functions that contain server-side code (not components!!), because API routes will only run on the server (and never on the client; and the code in them will never be exposed to the client. so we can also use credentials in API routes, without compromising them --> and those functions are triggered whenever a request is sent to this route) ==> see pages/api/new-meetup.js

# Before deploying: metadata
One thing that you should always check in any kind of NextJS project, is **metadata**, which you might want to add to your pages
- we have to add a description metatag, which allows you to set descriptions that e.g. show up on a Google search
- page title (which becomes the tab title)
- go to index.js and look at how it is done there

# Deploy your NextJS application to Vercel TODO watch the video when you want to deploy your app