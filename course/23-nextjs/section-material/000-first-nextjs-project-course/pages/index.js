//| this will be our root page
//| so if a request reaches our domain / nothing, then just index.js will be loaded
//| the "index" name is a special name, and it is served whenever we have a request to just /

const HomePage = (props) => {
  return <h1>The Home Page</h1>;
};

export default HomePage;
