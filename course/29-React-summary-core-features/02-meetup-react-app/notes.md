# What is Routing?

e.g Netflix (NB a single page application): notice that when you click on something and you are redirected to another page, the page is not actually refreshed: IMPORTANT we want to give the user the illusion of having different pages to which we can navigate whilst actually staying on one and the same page, and leaving it up to React, to change what is visible on the page. The advantage of this approach is that we nwever have to wait for a new page to be loaded; instead, we can always stay fastm reactive because everything is handled by client side Javascript which is faster than sending a new request to a server. And this can really enhance user experience.
Therefore, we want to add something called **routing** to our project. We want to add a router, i.e. a special tool which watches changes in the URL and then changes what is visible on the screen based on the URL, and which basically gives the user the illusion of routing.

Install a third party package to our project:
    `npm install --save react-router-dom@5`
This is a package that allows to add routing functionality to react; it allows us to handle URLs and change what is visible on the screen without fetching new HTML pages.

## What does **add routing** mean?
We need to add this routing tool to our code so that it can watch for URL changes; and we need this tool know which component should be loaded as a page for which route (i.e. for which URL).
Create a new folder named "pages": BEST PRACTICE it is a good way of differentiating and of separating our components that are embedded in other components (which are storedn in the components folder), from the components that will be loaded as pages (NB we build them in the same exact way, it is just of help for us developers)