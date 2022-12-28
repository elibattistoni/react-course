# Routing

So far we have only built single page applications in which the URL never changes (if we want to share the link to a specific feature for example, we can't, we can only link the same page).

In this section we will dive into a concept called "ROUTING", and we are going to learn how we can add multiple pages (or the illusion of having multiple pages) with different URLS to the same singel page application.

So, we will still build a single page application where React and the browser is responsible for updating what the user sees, but we will still be able to change the URL and use multiple pages.


NB When we're not working with React (i.e. when we have a traditional Multi-Page App), we usually have a backend server (that stores different HTML files or generates them dinamically on this backend server) that sends to the frontend different HTML files when the user requests different URLs, and these HTML files are rendered by the browser. This is the Django approach, and it is not the approach we used so far in the course, because when we use different HTML pages, we don't have a Single Page App. In the Django approach, whenever we change the URL, we leave our running client (frontend) side app, we lose all the state, and we have to wait for the request-response cycle, and we have to let the browser render this new page. This is one of the reasons why we switched to React: we don't want to have this traditional flow. Instead we we want to load a client side application (a JavaScript web app), which runs in the browser, and we want to utilize this application to change what's visible on the screen with JavaScript so that we can provide this very instant reactive user experience (which we can do with JavaScript in the browser, and fetching different HTML pages does not fit this requirement, because there we leave the browser request a new page rendered in new page, and that's not this reactive experience which we typically wanna offer).

NB we can continue building single page applications and therefore have only one HTML page, which is initially loaded when the user first visits our website, and then thereafter we have JavaScript take over + with JavaScript we can also manipulate the URL and the path after our domain, and we can write some React code that controls the URL and that changes what is displayed on the screen when the URL changes or when a link is clicked, without fetching a new HTML file (i.e. without sending a request to the backend for a new HTML file).

# React Router
There is a popular React Library that allows us to create Multi Page Applications (MPAs) with React --> React Router provides client-side routing (i.e. rounting functionalities in our client-side React app) --> "routing" means that different paths in the URL load different pages.

There are 2 main versions of React Ruter: 5 and 6. v6 is the newer version, but v5 is the one that is used basically in all projects. So we will start with v5 and then we will learn how to update to v6.

To install React Router: `npm install react-router-dom` to install the v5: `npm install react-router-dom@5`