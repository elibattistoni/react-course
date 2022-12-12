import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { Fragment } from "react";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <Fragment>
      <Cart />
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
