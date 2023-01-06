import Layout from "../components/layout/Layout";

import "../styles/globals.css";

//% NB this is the root component that NextJS will render
//| it receives props and uses object destructuring to pull information out of the props
//| and the thigs it descructures are 2 components: a Component propr, and a pageProps
//| these props are passed into the App component automatically by NextJS, since NextJS is what uses that component
//| and Component is a prop that holds the actual page contents that should be rendered (so it will be different whenever we switch)
//| and pageProps are specific props our page might be getting
//| we are going to wrpa this component with the Layout component, so that we do not have to do it for all the different component/page files
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

//| NB whenever you have some component or some setting that affects all your pages
//| you can utilize this _app.js file to easily add that without diving into dozens of files individually.
