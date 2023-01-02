# Steps for deployment

### 1. Test Code

### 2. Optimize Code
(e.g. with **React.memo** which avoids unnecessary rerender cycles; and with **lazy loading** i.e. loading certain chunks/parts of our code only when that code is needed). remember that with React Single Page Applications you build one big JavaScript code bundle, and this entire bundle needs to be downloaded by every visitor of your website in order to use that site. With lazy loading you want to split your code into multiple chunks/bundles, whcih are then each downloaded when they are needed. Lazy loading is easy to implement if you are using Routing, because then you can split your code by Route, so that the code for a specific route is only downloaded when that route is visited. Got o App.js to see how this works.

### 3. Build App for Production
we can run a script that takes all our code (as small as possible and as bundled up as possible), converts it to JS code that the browser understands.
For Production, we will run the build command (see package.json) which will transofmr our code and optimize it and shrink it as much as possible, and it will not start a server.

`npm run build`

This will build the production output, which we can find in the **build** folder --> NB the content of this folder contains all the code we need to deploy: the files inside the build folder are those that we need to move onto our server so that our app can run there. NEVER CHANGE THE CODE INSIDE THIS FOLDER.
NB it is the static folder that contains our optimized CSS code and our optimized and browser-ready JavaScript code

### 4. Upload production code to server
NB a Single Page Application (regardless of the framework i.e. React, Angular, Vue) is a static website, i.e. it is only made up of HTML, CSS and browser side Javascript: there is no server side code involved.

Therefore when we want to deploy our React Single Page App, we need a STATIC SITE HOST, so we need a hosting provider (an offering) for hosting a static website (we don't need a hosting provider that allows us to run server side code like NodeJS or PHP).

To find a hosting provider, google "static website hosting provider".

We opted for Firebase, but NB it is just one of the many options available, and remember that just because we are using Firebase as a dummy backend, it does not mean that you need to use Firebase for hosting.

Go to the menu "Hosting", then click on "Get Sttarted" and you need to install the following (follow the get started instructions):

`npm install -g firebase-tools` which installs the Firebase tools saoftware on my system.

After installing it, click on "Next", then you need to log in therefore run `firebase login`
In your project folder, run `firebase init`
go to hosting with the arrows and press spacebar to select that option

when prompted to entere the name of the public directory which contains the files that should be deployed. therefore write: build
==> ? What do you want to use as your public directory? build

### 5. Configure server

IMPORTANT: when deploying single page applications it is important to understand that there is a difference between server-side routing and clinet-side routing. In our demo app, we use routing with React Router, which is a browser-side package (it is called react-router-dom!!): it runs in the browser, it looks at the URL and changes what we see on the screen after our React app was loaded by the browser.
When I enter a URL and hit Enter, several things happen: we have a server and a client (client is us, the user using the browser; the server is a remote machine that hosts our production-ready React code, i.e the code we are currently deploying: this will live on some server. not on our local machine and not on the machine of the users): if a user visits our page, enters the domain and maybe enter a patch after that, this sendsa a request to the server (a request for this website), and this request **contains the full URL that was entered**, and that request then hits the server, and the server sends back a response that contains all the CSS and HTML and React code (the react code that we built and deployed); this react code contains the react router code, which will look at the path (the part of the URL after the domain) and it will then evaluate that and bring the correct component on the screen; but this only happens once the response was received.
However, the URL which the user entered with the specific path, like /some-route, is also part of the requests. So the request which reaches the server contains this path. It contains this full URL. And by default, a server would then look for different files which it would return as a response for different URLs. That's how servers typically work. Different URLs trigger different actions and will lead to different responses. But we don't want that. When hosting a Single Page Application, we wanna ignore the path, so the part after the domain on the server, and always return the same response, the same HTML file and the same JavaScript files no matter which path the user targeted. We need to do that so that our React application will start up, and then it's this React application and React Router, which is part of that application, which will take another look at that URL and then render the correct content on the screen. So the server needs to ignore that path /some-route. By default, a server does not do that. Hence, you need to configure your servers so that it does do that.
In the case of Firebase, it's very easy because they ask you whether you want to ignore that. This is exactly this point which we're seeing here, if all URLs should be rewritten to index HTML so that no matter which kind of URL the request was sent to, we always return the same HTML file, which then, in turn, requests always the same JavaScript code, no matter what the URL was.

==> ? Configure as a single-page app (rewrite all urls to /index.html)? y

TO RECAP:

? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
? File build/index.html already exists. Overwrite? No

in the last question, we choose no because we want to go with the HTML file that was generated by the npm run build command

On the firebase website, click on Next and then run `firebase deploy` to finally deploy our page
When you run firebase deploy, that configuration will be used to now deploy our code in the build folder to Firebase. So now, this uploads our code, and once it's done, it even gives us a pointer at the URL where we can view our application.

Project Console: https://console.firebase.google.com/project/quotes-react-app-4c7a2/overview
Hosting URL: https://quotes-react-app-4c7a2.web.app

In the Hosting console in the Firebase page, you can configure this application

If you want to take your page down:
`firebase hosting:disable`