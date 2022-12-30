import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import BlogLayout from './pages/BlogLayout';
import BlogPostsPage, { loader as blogPostsLoader } from './pages/BlogPosts';
import ErrorPage from './pages/Error';
import NewPostPage, { action as newPostAction } from './pages/NewPost';
import PostDetailPage, { loader as blogPostLoader } from './pages/PostDetail';
import RootLayout from './pages/RootLayout';
import WelcomePage from './pages/Welcome';

const router = createBrowserRouter(
  createRoutesFromElements(
    // NB no more Routes parent component, but only Route component!
    // NB and the parent Route component must render the RootLayout component
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        {/* //% all the following components will be rendered inside the RootLayout component (the place where they should be inserted is indicated by the Outlet component in RootLayout ) */}
      <Route index element={<WelcomePage />} />
      {/* NB index stands for path="/" basically */}
      <Route path="/blog" element={<BlogLayout />}>
        {/*
            // NB for loading data --> loader in BlogPosts.jsx
            // NB loader is a prop that has been introduced in React Router 6.4
            // NB and react router will automatically call the function blogPostsLoader when we navigate to this route
            // NB and it will automatically get the data returned by this loader function and make it available in the function component BlogPostsPage
            // NB in BlogPostsPage you have to use the new react router 6.4 hook named useLoaderData
        */}
        <Route index element={<BlogPostsPage />} loader={blogPostsLoader} />
        {/* // NB you cna use the loader feature also if you have a dynamic path */}
        <Route
          path=":id"
          element={<PostDetailPage />}
          loader={blogPostLoader}
        />
      </Route>
      <Route
        path="/blog/new"
        element={<NewPostPage />}
        action={newPostAction}
      />
    </Route>
  )
);

function App() {
    // NB with React Router v6: you cannot use the BrowserRouter component anymore, you have to use the RouterProvider
  return <RouterProvider router={router} />;
}

export default App;
